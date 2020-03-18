export default class BVReflection {
    constructor(par) {
        this.type = "BVReflection"
        this.par = par
        this.mirrorMat = undefined
        if(this.par.visi3D){
            const visi3D = this.par.visi3D;
            this.mirrorMat = new MirrorMat(visi3D.renderer, visi3D.scene, new THREE.Vector3(0, 0, 0))  
        }       

        this._active = false
        this._renderPeriod = 1
        this._resolution = 64
        this.updateCount = 0
        this.reflectiveObjects = {}
    }

    update() {
        if (!this._active) {
            return
        }
        ++this.updateCount
        if (this.updateCount % this._renderPeriod === 0) {
            this.mirrorMat.updateMirrors()
        }
    }

    setScene(object3d) {
        this.scene = object3d
    }

    changeTextures(object3d) {
        if (object3d.material && object3d.material.envMap) {
            object3d.material.envMap = this.mirrorMat.mirrorTexture
        }
        if (object3d.children) {
            object3d.children.forEach(c => this.changeTextures(c))
        }
    }

    addReflective(object3d) {
        if (!(object3d.uuid in this.reflectiveObjects)) {
            this.reflectiveObjects[object3d.uuid] = {
                object3d,
                basicMaterial: object3d.material
            }
        }
        if(this._active) {
            this.reflectiveObjects[object3d.uuid].material = this.mirrorMat.mirrorMaterial
        }
    }

    addTransparent(object3d) {
        this.mirrorMat.transparentObjects.push(object3d)
    }

    setBasicMaterial() {
        for (let id in this.reflectiveObjects) {
            this.reflectiveObjects[id].object3d.material = this.reflectiveObjects[id].basicMaterial
        }
    }

    setReflectiveMaterial() {
        for (let id in this.reflectiveObjects) {
            this.reflectiveObjects[id].object3d.material = this.mirrorMat.mirrorMaterial
        }
    }

    set active(value) {
        if (value !== this._active) {
            this._active = value
            if (this._active) {
                // this.setReflectiveMaterial()
                this.changeTextures(this.scene)
            } else {
                // this.setBasicMaterial()
            }
        }
    }
    get active() { return this._active }

    set renderPeriod(value) {
        this._renderPeriod = value
    }
    get renderPeriod() { return this._renderPeriod }

    set resolution(value) {
        if (value !== this._resolution) {
            this.mirrorMat.changeResolution(value)
            this._resolution = value
            this.setReflectiveMaterial()
        }
    }
    get resolution() { return this._resolution }

    set cameraPos(value) {
        this.mirrorMat.mirrorCamera.position.copy(value)
    }
    get cameraPos() {
        return this.mirrorMat.mirrorCamera.position
    }
}

class MirrorMat {
    constructor(renderer, scene, cameraPos) {
        this.type = "MirrorMat"
        this.renderer = renderer
        this.scene = scene
        this.cameraPos = cameraPos

        this.mirrorCamera = new THREE.CubeCamera(0.1, 1000, 64)
        this.scene.add(this.mirrorCamera)
        this.mirrorCamera.position.copy(cameraPos)
        this.mirrorMaterial = new THREE.MeshBasicMaterial({ envMap: this.mirrorCamera.renderTarget })
        this.mirrorTexture = this.mirrorCamera.renderTarget

        this.transparentObjects = []
    }

    /*changeMaterialByName(object3d, matName) {
        if (object3d.material) {
            if (object3d.material.name.indexOf(matName) != -1) {
                this.changeMaterial(object3d)
            }
        }
        if (object3d.children) {
            object3d.children.forEach(child => this.changeMaterialByName(child, matName))
        }
    }*/

    changeResolution(res) {
        this.scene.remove(this.mirrorCamera)
        this.mirrorMaterial.dispose()

        this.mirrorCamera = new THREE.CubeCamera(0.1, 1000, res)
        this.scene.add(this.mirrorCamera)
        this.mirrorCamera.position.copy(this.cameraPos)

        this.mirrorMaterial = new THREE.MeshBasicMaterial({ envMap: this.mirrorCamera.renderTarget })
        this.mirrorTexture = this.mirrorCamera.renderTarget
    }

    updateMirrors() {
        this.transparentObjects.forEach(m => {
            m.visible = false
        })
        this.mirrorCamera.update(this.renderer, this.scene)
        this.transparentObjects.forEach(m => {
            m.visible = true
        })
    }
}