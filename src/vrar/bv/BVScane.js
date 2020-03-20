


import { BVVideo } from './BVVideo.js';
import { BVStand } from './BVStand.js';
/*import BVReflection from './BVReflection'
import BVAdditional from './BVAdditional'

import BVLight from './BVLight';*/

export class BVScane  {
  	constructor(par, objectBase, visi3D) {  		
  		this.type="BVScane";
  		var self=this;
        this.objectBase;

        if(!window.dcmParam)window.dcmParam = new DCM();//интерфейс
        //dcmParam.fontSize=10;

        this.dCont = new DCont(document.body); 

        this.visi3D=visi3D;
        //this.pm=new PM(visi3D, objectBase);
        this.par=par;
       
        this._activMouse=true;
        this._activeObject=-1;

        this.content3d = new THREE.Object3D();
        if(this.par)this.par.content3d.add(this.content3d);
        //this.content3d.rotation.x=-Math.PI/2;
        // this.content3d.gObj=this;

        this._firstClick=false;

        this.bvReflection=undefined


        this.matBag=new THREE.MeshPhongMaterial({color:0x47aec8})
        var loader = new THREE.TextureLoader();
        this.matTest=new THREE.MeshPhongMaterial({color:0xff0000})  
         this.texture   
        this.modLoad=new ModLoad(this);
       // this.bvReflection = new BVReflection(this);
       // this.bvAdditional = new BVAdditional(this); 


        //this.bvLight = new BVLight(this);


        this.arrVideo=[]; 
        this.arrStand=[];


        this.isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (self.isMobile.Android() || self.isMobile.BlackBerry() || self.isMobile.iOS() || self.isMobile.Opera() || self.isMobile.Windows());
            }
        };
        this.mobile=false;
        if(this.isMobile.any()!=null)this.mobile=true;

       

        this.creatStand=function() {
            var stand=new BVStand(this);
            stand.idArr=this.arrStand.length;
            this.arrStand.push(stand);
            return stand;
        }

        this.creatVideo=function() {
            var video=new BVVideo(this);
            video.idArr=this.arrVideo.length;
            this.arrVideo.push(video);

            return video;
        }


        

        this.clear=function() { 
            for (var i = 0; i < this.arrStand.length; i++) {
                this.arrStand[i].clear();
            }
            for (var i = 0; i < this.arrVideo.length; i++) {
                this.arrVideo[i].clear();
            }            
            this.arrVideo=[]
            this.arrStand=[]
        }



        this.getParName=function(c3d,name){            
            if(c3d[name]!=undefined)return c3d[name];
            if(c3d.parent!=undefined)return this.getParName(c3d.parent,name);
            return null
        }

        var dinObj
        this.down = function (e) {            
            //trace(e)
            if(e!=null){
                if(e.target!=null){ 
                    dinObj=self.getParName(e.target,"objBase");
                    if(dinObj!=null){
                        self.activeObject=dinObj.idArr
                    }
                }
            }
            self.activeObject=-1;
        }  
        if(this.par)this.par.visi3D.addEvent("down", this.down);


        this.mousedown=function(c){            
            if(self.mobile==false){
                document.removeEventListener("mouseup", self.mousedown)
            }else{
                document.removeEventListener("touchend", self.mousedown)
            }
            setTimeout(function() {
                self.firstClick=true;   
            }, 1);
                      
        }


        
        if(this.mobile==false){
            document.addEventListener("mouseup", self.mousedown)
        }else{
            document.addEventListener("touchend", self.mousedown)
        }  
        
        





        this.getObj=function() {  
            var o={}
            o.arrVideo=[];
            o.arrStand=[];
            for (var i = 0; i < this.arrVideo.length; i++) {
                o.arrVideo.push(this.arrVideo[i].getObj());
            }
            for (var i = 0; i < this.arrStand.length; i++) {
                o.arrStand.push(this.arrStand[i].getObj());
            }                  
            return o;
        }

        this.setObj=function(o) { 
            this.clear();

            for (var i = 0; i < o.arrVideo.length; i++) {
                let _o = this.creatVideo() 

                _o.setObj(o.arrVideo[i])                
            }

            for (var i = 0; i < o.arrStand.length; i++) {
                let _o = this.creatStand()
                _o.setObj(o.arrStand[i])                
            }        
        }


        this.setVideo=function(link, bool) {
            trace("setVideo",bool)
            var o={}
            o.arrVideo=[]
            o.arrStand=[]
            o.arrVideo[0]={}
            o.arrVideo[0].src=link;
            o.arrVideo[0].active=true;
            o.arrVideo[0].bCanvas=false
            if(bool==true)o.arrVideo[0].bCanvas=true

            this.setObj(o);
            this.modLoad.setV(this.arrVideo[0].material);
        }

        var canvas,ctx,video;
        this.update = function () {
            for (var i = 0; i < this.arrVideo.length; i++) {
                this.arrVideo[i].update();
            }
            if(this.bvReflection)this.bvReflection.update()

            if(canvas){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                trace(canvas.width)
                ctx.drawImage(video, 0, 0, 100, 100);


                ctx.beginPath();
                ctx.rect(canvas.width*Math.random(), canvas.height*Math.random(), 100, 90);
                ctx.strokeStyle = "red";
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.stroke();


                this.texture.needsUpdate = true;
            }    
        }



        
        this.testV = function(link){ 
            

            //video = document.createElement('video');
            video = document.getElementById('video'); 
            video.preload = 'auto';
            video.autoload = true;
            video.autoplay = true;
            video.loop = true;
            video.crossorigin="Anonymous"
            video.src = link;


            this.window=new DWindow(this.dCont,300,220,"testV");
            
            var dC1 = new DCont(this.window.content); 
            dC1.scale=0.2
            var dC = new DCont(dC1);             
            dC.div.appendChild(video); 


            setTimeout(function() {
                video.play()
                var t=new DLabel(self.window,0,-50,video.videoWidth+"  "+video.videoHeight)
            }, 2000);

            
            video.onloadedmetadata = function(e) {
                
                
                canvas = document.createElement('canvas'); // канвас для картинки                
                canvas.width=512//video.videoWidth;
                canvas.height=512//video.videoHeight;
                ctx = canvas.getContext('2d')

                var dC2 = new DCont(dC1);
                dC2.y = video.videoHeight;           
                dC2.div.appendChild(canvas);



                self.texture = new THREE.CanvasTexture( canvas );
                self.texture.minFilter = THREE.LinearFilter;
                self.texture.magFilter = THREE.LinearFilter;
                self.texture.format = THREE.RGBFormat;
                self.texture.needsUpdate = true;

                self.material=new THREE.MeshPhongMaterial({color:0xffffff, map:self.texture})

                self.modLoad.setV(self.material)
            }


        }



    }

    set firstClick(value) {
        if(this._firstClick!=value){         
            this._firstClick= value;

            for (var i = 0; i < this.arrVideo.length; i++) {
                this.arrVideo[i].firstClick= this._firstClick;              
            }
           
        }
    }    
    get firstClick() { return  this._firstClick;} 





    set activeObject(value) {
        if(this._activeObject!=value){         
            this._activeObject= value;           

            if(this._activeObject!=-1){
                if(this.par && this.par.menu){
                    this.par.menu.mObject.setObject(this.arrStand[this._activeObject])
                    this.par.menu.index=1; 
                }
                
               // this.fun("naMObj",this.arrStand[this._activeObject])
            }
           
        }
    }    
    get activeObject() { return  this._activeObject;} 
}


export default class ModLoad  {
    constructor(par) {          
        this.type="ModLoad";
        this.par=par;
        this.content3d = new THREE.Object3D();
        this.par.content3d.add(this.content3d);
        this.material=undefined;
        this.c3d=undefined;

        this.pars=function(){
            if(this.material==undefined)return
            if(this.c3d==undefined)return 
               
            this.parsO3d(this.c3d, this.material)
        }

        this.parsO3d=function(c, m){
            if(c.geometry!=undefined){
                
                if(c.name.indexOf("Mesh.023")!=-1){
                   
                    c.material=m
                }
            }


            for (var i = 0; i < c.children.length; i++) {
                this.parsO3d(c.children[i],m)
            }
        }


        this.gltfLoader = new THREE.GLTFLoader();
        this.gltfLoader.load('./resources/DemoRoom.gltf', gltf => {
            var s=100;
            gltf.scene.scale.set(s, s, s)
            gltf.scene.rotation.y=-Math.PI/2
            this.content3d.add( gltf.scene )
            this.c3d=gltf.scene
            this.pars()
                     
        })


        this.setV=function(material){
           
            this.material=material
            this.pars()
        }

    }
}

