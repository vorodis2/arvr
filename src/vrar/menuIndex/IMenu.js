
/**/
import { LocalStorage } from './LocalStorageE6.js';


export class IMenu  {//default 
  	constructor(objectBase,fun) {  		
  		this.type="IMenu";
  		var self=this;
        this.objectBase=objectBase;
        this.fun=fun;
        if(!window.dcmParam)window.dcmParam = new DCM();//интерфейс
        //dcmParam.fontSize=10;

        this.dCont = new DCont(document.body); 
       

        this.array=[];
        this.array[0] = this.mHelp=new MHelp(this,function(s,p){

        });

        this.array[1] = this.mScenePos = new MScenePos(this, (s, p) => {})






        this.array[5] = this.mTV=new MTV(this,function(s,p){

        });



        this.setHelp = function(arr){ 
            this.mHelp.setHelp(arr)
        }
       

        
        this.tick = function(){ 
            
        }


      
        this.upScane = function(bvScane){ 
           
        }


        var _w,_h,_s
  		this.sizeWindow = function(w,h,s){ 
            if(w){
                _w=w;
                _h=h;
                _s=s;
            }
            this.mHelp.sizeWindow(_w,_h,_s);
        }
  	}
}

export class MTV  {
    constructor(par, fun) { 
        this.type="MTV";
        var self=this
        this.par=par       
        this.fun=fun

        var bvScane
        this.dCont = new DCont(this.par.dCont);


        

        this.init=function(){
            this.window=new DWindow(this.dCont,300,220,"MTV");
           //"https://vto.s3-us-west-2.amazonaws.com/bravo_video.mp4"
            //"resources/tes1.mp4"
            var input= new DInput(this.window.content,5,5,"https://vto.s3-us-west-2.amazonaws.com/bravo_video.mp4")
            input.width=300

            var chek= new DCheckBox(this.window.content,115,35,"canvas",function(){
                
            })
            chek.value=true

            var bat= new DButton(this.window.content,5,35,"test",function(){
                bvScane.setVideo(input.text, chek.value);
            })


      


        }
        
        this.setBV=function(b){
            this.init()
            bvScane=b;
        }

    }
}



export class MHelp  {
    constructor(par, fun) { 
        this.type="MHelp";
        var self=this
        this.par=par       
        this.fun=fun

        this._sah=-1;
        this.sahOld=-1;
        this.array=undefined


        this.dCont = new DCont(this.par.dCont);


        //this.window=new DWindow(this.dCont,0,0,"this.type");

        this.funDrag=function(){

        }

        //obj=objectBase.bd[i].obj//.resurs.array
        this.init=function(arr){
            if(this.array!=undefined)return
            this.array=[]


            for (var i = 0; i < arr.length; i++) {
                              
                this.array[i]=new MHBlok(this, arr[i], this.funDrag);
                this.array[i].idArr=i
            }
        } 



        var _w,_h,_s
        this.sizeWindow = function(w,h,s){ 
            if(w){
                _w=w;
                _h=h;
                _s=s;
            }

            if(this.array==undefined)return
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].setXY(_w/_s/2,_h/_s/2);
            }
        }        

        this.md=function(e){          
            self.sah++;
        }

        this.setHelp = function(arr){ 
            this.init(arr);
            this.sah = 0;
        }


      /*  this.localStorage = new LocalStorage(null, "vrSah");           
        if(this.localStorage.object.sah==undefined)this.localStorage.object.sah=5;

        this.localStorage.object.sah--       
        if(this.localStorage.object.sah>=0&&this.obj&&this.obj.resurs&&this.obj.resurs.array&&this.obj.resurs.array.length>0){
            this.init();
            this.sah = 0;
            this.localStorage.save()
        }*/
        
    }

    set sah(value) {
        if(this._sah!=value){
            if(this._sah==-1){//стартуем кликер
                if(dcmParam.mobile==false){                 
                    document.addEventListener("mousedown", this.md);
                }else{                  
                    document.addEventListener("touchstart", this.md);               
                } 
            }
            this.sahOld=this._sah
            this._sah= value;

            if(this.array[this._sah]!=undefined){
                this.array[this._sah].active=true;

            }else{
                this._sah=-2;

                if(dcmParam.mobile==false){                 
                    document.removeEventListener("mousedown", this.md);
                }else{                  
                    document.removeEventListener("touchstart", this.md);               
                } 
            }
            if(this.array[this.sahOld]!=undefined)this.array[this.sahOld].active=false;
            
            
        }
    }    
    get sah() { return  this._sah;} 

}

export class MHBlok  {
    constructor(par, link, fun) { 
        this.type="MHBlok";
        var self=this;     
        this.par=par
        this.link=link
        this.fun=fun;
        this._active=false;
        this.idArr=-1
        this.dCont= new DCont(null);
       
        this.dCont.alpha=0;


        this.tween = new TWEEN.Tween(this.dCont);
        this.tween.onComplete(function(){ 
            if(self._active==false){
                if(self.dCont.parent){
                    self.dCont.parent.remove(self.dCont)
                    
                }
            }
        })
        
        this.setXY=function(_x,_y){
            this.dCont.x=_x;
            this.dCont.y=_y;            
        }

        this.image=new DImage(null,0,0,link,function(){                
            this.width=this.picWidth/2;
            this.height=this.picHeight/2;
            this.x=-this.width/2;
            this.y=-this.height/2;          
            self.dCont.add(this);
        })
    }

    set active(value) {
        if(this._active!=value){
            this._active= value; 
            
            if(value==true){
                this.par.dCont.add(this.dCont)
                this.dCont.alpha=0;
                this.tween.to({alpha:1},500).start(); 
            }else{
                this.tween.to({alpha:0},500).start(); 
            }
        }
    }    
    get active() { return  this._active;} 
}

export class MScenePos {
    constructor(par, fun) {
        this.type = 'MScenePos'
        this.par = par
        this.fun = fun
        this.content3d = null
        this.scene = null
        this.margin = 2
        // const facingInside = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0))
        // const facingOutside = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 10, 0))
        // const facingFar = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0))

        this.dCont = new DCont(this.par.dCont)
        this.buttonInside = new DButton(this.dCont, this.margin, this.margin, 'inside', () => {
            this.content3d.position.set(0, 0, 0)
            this.content3d.rotation.set(0, 0, 0)

            this.scene.emit('recenter', /*{
                origin: {x: 0, y: 0, z: 0},
                facing: facingInside,
            }*/)
        })
        this.buttonOutside = new DButton(this.dCont, this.margin, 0, 'outside', () => {
            this.content3d.position.set(1, 0, -6.5)
            this.content3d.rotation.set(0, Math.PI / 10, 0)

            this.scene.emit('recenter', /*{
                origin: {x: 2, y: 0, z: -6.5},
                facing: facingOutside,
            }*/)
            // this.camera.rotation.set(0, Math.PI / 10, 0)
        })
        this.buttonFar = new DButton(this.dCont, this.margin, 0, 'far', () => {
            this.content3d.position.set(10, 1, -90)
            this.content3d.rotation.set(Math.PI / 4, Math.PI / 8, 0)
            
            this.scene.emit('recenter', /*{
                origin: {x: 0, y: 0, z: 0},
                facing: facingFar,
            }*/)

            this.tweenPosition.to({x: 1, y: 0, z: -6.5},3000).start()
            this.tweenRotation.to({x: 0, y: Math.PI / 10, z: 0},3000).start()
        })

        this.buttonOutside.y = this.buttonInside.y + this.buttonInside.height + this.margin
        this.buttonFar.y = this.buttonOutside.y + this.buttonOutside.height + this.margin
    }

    set3d(content3d, scene) {
        this.content3d = content3d
        this.tweenPosition = new TWEEN.Tween(this.content3d.position)
        this.tweenRotation = new TWEEN.Tween(this.content3d.rotation)
        // this.tweenPosition.onComplete(() => {
        //     this.scene.emit('recenter')
        // })
        this.scene = scene
    }
}
