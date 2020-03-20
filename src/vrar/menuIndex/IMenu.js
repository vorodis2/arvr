
/**/
import { LocalStorage } from './LocalStorageE6.js';


export class IMenu  {//default 
  	constructor(objectBase,fun) {  		
  		this.type="IMenu";
  		var self=this;
        this.objectBase=objectBase;
        this.fun=fun;
        window.dcmParam=window.dcmParam = new DCM();//интерфейс
        //dcmParam.fontSize=10;

        this.dCont = new DCont(document.body); 
       

        this.array=[];
        this.array[0] = this.mHelp=new MHelp(this,function(s,p){

        });






        this.array[5] = this.mTV=new MTV(this,function(s,p){

        });



        this.setHelp = function(arr){ 
            this.mHelp.setHelp(arr)
        }
        var canvas,ctx,video;
        this.testV = function(link){ 
            

            video = document.createElement('video');
            video.preload = 'auto';
            video.autoload = true;
            video.autoplay = true;
            video.loop = true;
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
                trace("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                trace(video.videoWidth+"@@@@@@@@@@@@@@@@@@@@@@@@@@@"+video.videoHeight)
                
                canvas = document.createElement('canvas'); // канвас для картинки                
                canvas.width=video.videoWidth;
                canvas.height=video.videoHeight;
                ctx = canvas.getContext('2d')

                var dC2 = new DCont(dC1);
                dC2.y = video.videoHeight;           
                dC2.div.appendChild(video);
            }



           



        }

        
        this.tick = function(){ 
            if(canvas){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                /*s=canvas.width/_w;
                s1=canvas.height/_h;
                if(s1>s)ss=s1;
                else ss=s;
                //ss*=0.8

                x1=_w*ss;
                y1=_h*ss;

                x2=(this.canvas.width-x1)/2
                y2=(this.canvas.height-y1)/2  */          
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
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

            var input= new DInput(this.window.content,5,5,"resources/video/videoplayback.webm")
            input.width=300

            var chek= new DButton(this.window.content,5,35,"test",function(){
                bvScane.setVideo(input.text);
            })

            var bat= new DButton(this.window.content,5,35,"test",function(){
                bvScane.setVideo(input.text);
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
