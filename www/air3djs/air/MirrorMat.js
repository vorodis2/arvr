import { Reflector } from './Reflector';

export default class MirrorMat {
    constructor(renderer, scene, cameraPos) {
        this.type = "MirrorMat"
        this.renderer = renderer
        this.scene = scene

        this.mirrorCamera = new THREE.CubeCamera(0.1, 1000, 64)
        // this.mirrorCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter
        this.scene.add(this.mirrorCamera)
        this.mirrorCamera.position.copy(cameraPos)
        this.mirrorMaterial = new THREE.MeshBasicMaterial({ envMap: this.mirrorCamera.renderTarget })

        this.mirrorObjects = []
    }

    changeMaterialByName(object3d, matName) {
        if (object3d.material) {
            if (object3d.material.name.indexOf(matName) != -1) {
                this.changeMaterial(object3d)
            }
        }
        if (object3d.children) {
            object3d.children.forEach(child => this.changeMaterialByName(child, matName))
        }
    }

    changeMaterial(object3d) {
        object3d.material = this.mirrorMaterial
        this.mirrorObjects.push(object3d)
    }

    updateMirrors() {
        this.mirrorObjects.forEach(m => {
            m.visible = false
        })
        this.mirrorCamera.update(this.renderer, this.scene)
        this.mirrorObjects.forEach(m => {
            m.visible = true
        })
    }
}