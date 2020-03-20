export default class BVAdditional {
    constructor(par) {
        this.type = "BVAdditional"
        this.par = par
        this.content3d = new THREE.Object3D()
        this.par.content3d.add(this.content3d)
        const self = this

        this.arrC3D = []
        for (var i = 0; i < 2; i++) {
            this.arrC3D[i] = new THREE.Object3D()
            this.content3d.add(this.arrC3D[i]);
            if(i==0)this.arrC3D[i].visible=false
        }

        this.par.pm.getId(15, function (c3d) {
            self.arrC3D[0].add(c3d);
        })

        this.par.pm.getId(18, function (c3d) {
            self.arrC3D[1].add(c3d);
            setTimeout(() => {
            }, 1000);
            self.par.bvReflection.setScene(c3d)
            /*c3d.children.forEach((o, i) => {
                if (i === 0) {
                    self.par.bvReflection.addReflective(o)
                } else {
                    self.par.bvReflection.addTransparent(o) // don't reflect boxes
                }
            })*/
        })  
    }

    setVisible(id, visible) {
        this.arrC3D[id].visible = visible
    }
}
