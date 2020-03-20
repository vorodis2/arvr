

export class BVVideo  {
  	constructor(par) {  		
  		this.type="BVVideo";
  		var self=this;
        this.idArr=-1;
        this.par=par;
        this._src="null";
        this._active=false; 

        this._firstClick= this.par._firstClick;
        this._bCanvas = false;


        this.video = document.createElement('video');
        this.video.preload = 'auto';
        this.video.autoload = true;
        this.video.autoplay = true;
        this.video.loop = true;
        this.video.crossOrigin = "Anonymous"


       /* var dC1 = new DCont(this.par.dCont); 
            dC1.scale=0.2
            var dC = new DCont(dC1);             
            dC.div.appendChild(this.video); */

        this.texture = undefined 
        this.material= undefined 
        
        this.canvas = undefined; 
        this.ctx = undefined; 


        this.creatCanvas=function(){
            if(this.canvas!=undefined)return


            trace("@@@@@@@@@@@creatCanvas@@@@@@@@@@")

            this.canvas = document.createElement('canvas'); // канвас для картинки                
                //canvas.width=video.videoWidth;
                //canvas.height=video.videoHeight;
            this.ctx = this.canvas.getContext('2d');


            
            this.texture = new THREE.CanvasTexture( this.canvas );
            this.texture.minFilter = THREE.LinearFilter;
            this.texture.magFilter = THREE.LinearFilter;
            this.texture.format = THREE.RGBFormat;
            this.texture.needsUpdate = true;

            this.material=new THREE.MeshPhongMaterial({color:0xffffff, map:this.texture})

        } 


        this.video.onloadedmetadata = function(e) {
            if(self.canvas){
                self.canvas.width=self.video.videoWidth;
                self.canvas.height=self.video.videoHeight;                
            }
        }



        this.clear=function() {  
            this.material.dispose() 
            this.texture.dispose() 
            delete  this.video         
        }
        this.dragCan=false   
        this.update = function () {
            
            if(this._active==false)return 
            if(this._bCanvas != true) return          
            if(this.dragCan == false) return 

            trace(self.canvas.width+"   "+self.canvas.height)
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height); 
            self.ctx.drawImage(self.video, 0, 0, self.canvas.width, self.canvas.height); 


            self.ctx.rect(Math.random()*self.canvas.width, Math.random()*self.canvas.height, 100, 100);    

            
            //self.ctx.fill();

            self.texture.needsUpdate = true;
            trace("--")   
        }


        this.getObj=function() {  
            var o={}
            o.src=this._src;
            o.active=this._active;                   
            return o;
        }

        this.setObj=function(o) { 
            this.bCanvas = o.bCanvas;
            this.src = o.src;
            this.active = o.active;                
        }
    }


    set bCanvas(value) {
        trace(this._bCanvas+">>",value)   
        //if(this._bCanvas!=value){         
            this._bCanvas= value; 
            if(this._bCanvas==true){
                this.creatCanvas() 
            }
            else{

                this.texture = new THREE.VideoTexture( this.video );
                this.texture.minFilter = THREE.LinearFilter;
                this.texture.magFilter = THREE.LinearFilter;
                this.texture.format = THREE.RGBFormat;
                //this.texture.needsUpdate = true;

                this.material=new THREE.MeshPhongMaterial({color:0xffffff, map:this.texture})
                
                //this.material.map=this.texture
            } 


                   
        //}
    }    
    get bCanvas() { return  this._bCanvas;}



    set firstClick(value) {
        if(this._firstClick!=value){         
            this._firstClick= value;           
            this._active=!this._active;
            this.active=!this._active;            
        }
    }    
    get firstClick() { return  this._firstClick;}


    set src(value) {
        if(this._src!=value){         
            this._src= value;
            this.video.src = value;
           
        }
    }    
    get src() { return  this._src;}

    set active(value) {
        if(this._active!=value){         
            this._active= value;

            if(this._firstClick==false)return

           // this.texture.needsUpdate = value;

            if(value==true){
                this.video.play()
                this.dragCan=true                
            }else{
                this.video.pause()
            }
            
           
        }
    }    
    get active() { return  this._active;} 
}

