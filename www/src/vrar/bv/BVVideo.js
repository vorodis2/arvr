

export class BVVideo  {
  	constructor(par) {  		
  		this.type="BVVideo";
  		var self=this;
        this.idArr=-1;
        this.par=par;
        this._src="null";
        this._active=false; 

        this._firstClick= this.par._firstClick;



        this.video = document.createElement('video');
        this.video.preload = 'auto';
        this.video.autoload = true;
        this.video.autoplay = true;
        this.video.loop = true;

        this.texture = new THREE.VideoTexture( this.video );
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.magFilter = THREE.LinearFilter;
        this.texture.format = THREE.RGBFormat;
       // this.texture.needsUpdate = true;

        this.material=new THREE.MeshPhongMaterial({color:0xffffff, map:this.texture})



        this.clear=function() {  
            this.material.dispose() 
            this.texture.dispose() 
            delete  this.video         
        }

        this.update = function () {
            if(this._active==false)return            
               
        }


        this.getObj=function() {  
            var o={}
            o.src=this._src;
            o.active=this._active;                   
            return o;
        }

        this.setObj=function(o) {  
            this.src = o.src;
            this.active = o.active;    
        }
    }

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

            this.texture.needsUpdate = value;

            if(value==true){
                this.video.play()
            }else{
                this.video.pause()
            }
            
           
        }
    }    
    get active() { return  this._active;} 
}

