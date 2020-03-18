

export default class BVLight  {
  	constructor(par) {  		
  		this.type="BVLight";
  		var self=this;
        this.idArr=-1;
        this.par=par;

        this.content3d = new THREE.Object3D()
        this.par.content3d.add(this.content3d)
       
        this.array=[]    




        this.na=function(c3d){
           /* var intensity = 1.5;
            var pointLight = new THREE.PointLight( 0xff0000, intensity, 700 );
            pointLight.castShadow = true;
            pointLight.shadow.camera.near = 1;
            pointLight.shadow.camera.far = 60;
            pointLight.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

 
           c3d.parent.add(pointLight);
            pointLight.position.copy(c3d.position)  
            c3d.parent.remove(c3d) */

           /* var spotLight = new THREE.SpotLight( 0xff0000, 20 );

            spotLight.castShadow = true;
            spotLight.angle = 0.95;
            spotLight.penumbra = 0.5;
            spotLight.decay = 2;
            spotLight.distance = 800;*/







            var spotLight = new THREE.SpotLight( 0xffffff );

            //spotLight.position.set( 100, 1000, 100 );

            spotLight.position.y=c3d.parent.position.y+500
            spotLight.position.x=c3d.parent.position.x*1.5
            spotLight.position.z=c3d.parent.position.z*1.5

            spotLight.angle = 0.75;

            spotLight.castShadow = true;


            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;

            spotLight.shadow.camera.near = 500;
            spotLight.shadow.camera.far = 4000;
            spotLight.shadow.camera.fov = 30;

            var lightHelper = new THREE.SpotLightHelper( spotLight );             
            this.par.par.visi3D.scene.add(spotLight, lightHelper); 
            lightHelper.update();
            return 




            var lightHelper = new THREE.SpotLightHelper( spotLight ); 
            c3d.updateMatrixWorld(true)
            var posit =  c3d.worldToLocal(new THREE.Vector3())
            
            var posit1 = new THREE.Vector3(600,0,0)// c3d.localToWorld(new THREE.Vector3())  
        
            trace(posit,posit1,c3d.parent.position)

            this.par.par.visi3D.scene.add(spotLight, lightHelper);           
            

            trace(this.par.par.visi3D.scene)

            spotLight.position.y=c3d.parent.position.y-20
            spotLight.position.x=c3d.parent.position.x
            spotLight.position.z=c3d.parent.position.z

            lightHelper.update();

            c3d.parent.remove(c3d) 

      
               


        }


        var sss =0   
        this.parser=function(c3d){
            if(c3d.children){
                for (var i = 0; i < c3d.children.length; i++) {
                    this.parser(c3d.children[i])
                }
            }
            
            if(c3d.name)if(c3d.name.indexOf('lightMy')!=-1){                 
               if(sss<1){
                    sss++
                    this.na(c3d)  
                }
            }
        }    



        this.par.pm.getId(19, function (c3d) {
            self.content3d.add(c3d);
            //self.parser(c3d)
        })



        this.update = function () {
            if(this._active==false)return            
               
        }


        this.getObj=function() {  
            var o={}
               
            return o;
        }

        this.setObj=function(o) {  
  
        }
    }






    set active(value) {
        if(this._active!=value){         
            this._active= value;

            if(this._firstClick==false)return

            this.texture.needsUpdate = value;

            if(value==true){
                this.video.play()
            }else{
                this.video.pause()
            }
            trace(this.video)
           
        }
    }    
    get active() { return  this._active;} 
}

