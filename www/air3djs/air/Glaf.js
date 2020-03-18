



/*
import { Menu } from './menu/Menu.js';
import { Home } from './floor/Home.js';

import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
import { SceneSB } from '../libMy/visi3D/SceneSB.js';

import { Grid } from './fManager/Grid.js';*/
import { rotationFromPoints, rand, setRotationFromPoints } from './helpers'
import { GLTFLoader } from '../resources/3DEarth/js/GLTFLoader'

import { TBase } from './trajectories/TBase.js';
import { Menu } from './menu/Menu.js';
import { Calc/*, PositionFun, Position */ } from './Calc.js';

import MirrorMat from './MirrorMat'

export class Glaf  {
  	constructor(main) {  		
  		this.type="Glaf";
  		var self=this; 

        this.mobile= dcmParam.mobile;

		this.dCont=undefined;
        this.main=main;
        this.par=main;

		this.debug = true;
        this.texLoader = new THREE.TextureLoader()
        this.gltfLoader = new THREE.GLTFLoader()
        // this.resources = './info/'
        this.resources = './air3djs/resources/'
        this.texLoader = new THREE.TextureLoader()
        this.gltfLoader = new THREE.GLTFLoader()
        // this.resources = './info/'
        this.resources = './air3djs/resources/'

       /* this.dCont=new DCont(document.body);        
        this.dCV=new DCont(); */

     
        this.content3d = new THREE.Object3D();

        //порезаный от пикси вювер
        this.visi3D = new MVisi3D(main.contentHTML, null, dcmParam.mobile, true, false, true, true);     
        this.visi3D.yes3d = true;           
        this.visi3D.groupObject.add(this.content3d);
        this.visi3D.alwaysRender=true;


        


        //ловим и откидываем на сцену изменение камеры
        this.visi3D.fun_rotationZ = function () { 
            //trace(self.visi3D.rotationX, self.visi3D.rotationZ, "   ",self.visi3D.zume)
        }




        //великая грабля с событиями 
        var visi3DEM=undefined
        var dcmParamEM=undefined
        this.touchmove=function(e){            
            e.preventDefault();            
            if(e.target===self.visi3D.position3d.div)visi3DEM(e)            
            dcmParamEM(e)                     
            e.stopPropagation();
        }        
        if (dcmParam.mobile==true){ 
            visi3DEM=this.visi3D.getFunMouseMove()
            dcmParamEM =  global.dcmParam.getFunMouseMove()          
            window.addEventListener('touchmove', self.touchmove, { passive: false, capture: true });            
        }

        // var geometry = new THREE.SphereGeometry( 500, 64, 64 );
        // var material = new THREE.MeshBasicMaterial( {color: 0x555555, transparent:true,opacity:0.5} );
        // var geometry = new THREE.SphereGeometry( 200, 64, 64 )
        // var material = new THREE.MeshBasicMaterial()
        // var sphere = new THREE.Mesh( geometry, material )

        /*material.map = this.texLoader.load(this.resources + '3DEarth/images/Erde_mehsDfs.jpg', () => {
            trace('texture loaded')
        })*/

        //this.sphere.name="sphereBase";
        var mv=new MatetialVideo(this,"videoplayback.webm")//"test.mp4")//
        const mirrorMat = new MirrorMat(this.visi3D.renderer, this.visi3D.scene, new THREE.Vector3(0, 0, 0))

        const radius = 210
        //this.gltfLoader.load(this.resources + '3DEarth/globe.gltf', gltf => {
        this.gltfLoader.load(this.resources + 'home.glb', gltf => {
            //gltf.scene.scale.set(10, 10, 10)
            //let a=mv.getObj(gltf.scene,"mat01_");
            mv.setDDD(gltf.scene)
          //  trace(a)
           // a.material=mv.material
            /*
            mv.start();*/
            
            mirrorMat.changeMaterialByName(gltf.scene, 'mat01_')
            gltf.scene.rotation.x=-Math.PI/2
            this.content3d.add( gltf.scene )

            gltf.scene.children[0].name="sphereBase"
            this.visi3D.addChildMouse(gltf.scene.children[0]);
            trace(gltf.scene)
        })


        const axesObj = new THREE.Object3D()
        axesObj.add(new THREE.AxesHelper( radius + 70 ))
        this.content3d.add(axesObj)

        // adding planes
       /* for(let i = 0; i < 10; ++i) {
            this.addPlane(radius)
        }*/

        //this.content3d.add( sphere );

     /*   global.calc=new Calc();
       




        this.tBase=new TBase(this);
        this.content3d.add(this.tBase.content3d);

        this.menu=undefined;
        if(this.debug==true){
            this.menu=new Menu(this);
            //this.visi3D.addChildMouse(this.sphere);


        }

*/







        let count = 0
  		//ап дете сцена деленая на 2 в мейне
		this.update = function () {
            ++count
            if(count % 10 === 0) {
            }
            mirrorMat.updateMirrors()

			this.visi3D.upDate()
            mv.update()
           // if(this.menu)this.menu.upDate()
		}

        //расчет окна
  		this.sizeWindow = function(w,h,s){    			
  			this.scale=s;
            /*this.dCont.scale=s*/
            this.visi3D.sizeWindow(0,0,w,h);
           // if(this.menu)this.menu.sizeWindow(w,h,s)
         /*  this.menu.sizeWindow(w,h,s);*/
            
  		}

  	}
/*
    set id(value) {
        if(this._id!=value){
            this._id= value;
            
            this.menu.id=value;
            var s=this.saveProdukt.php.server+"?id="+this._id;
            window.history.pushState("p3d", "p3d:"+this._id, s); 
         

              
        }
    }    
    get id() { return  this._id;}*/



}


export class MatetialVideo  {
    constructor(main, link) {         
        this.type="MatetialVideo";
        var self=this; 

        //var video = document.createElement('video');
        var video = document.getElementById('video');
        //video.style.position = 'fixed';
        //video.style.top = '500px';
        video.src = link;
        //video.autoplay = true;
        video.preload = 'auto'
        video.autoload = true
        //video.play()
        trace(">>>>>>>>>.",link)/**/

        



        var texture = new THREE.VideoTexture( video );
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;

        // texture = new THREE.TextureLoader().load('pic.jpg')
        // texture.repeat.x = 1
        // texture.repeat.y = 1
        // texture.wrapT = texture.wrapS = THREE.RepeatWrapping
        //texture.needsUpdate = true;

        this.material=new THREE.MeshPhongMaterial({color:0xffffff, map:texture })

        this.getObj=function(c,s){
            if(c.material){
                trace(c.material.name)
                if(c.material.name.indexOf(s)!=-1){
                    c.material=self.material;
                    
                    //return c
                }
            }
            if(c.children){
                for (var i = 0; i < c.children.length; i++) {
                    if(this.getObj(c.children[i],s)!=null){
                        //return c.children[i]
                    }
                }
            }
            return null
        }



        this.update = function () {
            
        }

        var ccc 

        this.mousedown=function(c){
            self.getObj(ccc,"mat02_");
            video.play()
            if(dcmParam.mobile==false){
                document.removeEventListener("mousedown", self.mousedown)
            }else{
                document.removeEventListener("touchstart", self.mousedown)
            }

        }


        this.setDDD=function(c){

            ccc=c;
            if(dcmParam.mobile==false){
                document.addEventListener("mousedown", self.mousedown)
            }else{
                document.addEventListener("touchstart", self.mousedown)
            }



            return
            var c3d=this.getObj(c,"mat02_");
            
            setTimeout(function() {

                video.play()
                c3d.material=self.material
            }, 2000);

        }




    }
}