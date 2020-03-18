




import { Menu } from './menu/Menu.js';
import { BVScane } from './bv/BVScane.js';
//import { Home } from './floor/Home.js';

//import { MVisi3D } from '../libMy/visi3D/MVisi3D.js';
//import { SceneSB } from '../libMy/visi3D/SceneSB.js';

import { Grid } from './Grid.js';
//import { FManager } from './fManager/FManager.js';

export class Glaf  {
  	constructor(main) {  		
  		this.type="Glaf";
  		var self=this;
  		this.content3d = new THREE.Object3D();
        this._index=-1;
        this._tipVisi=-1;
        this._tipDrav=-1;
        this._id=-1;

        this.idBool=false;
        this.idArr=[53]
        this.whSize=10000;

        this.mobile= dcmParam.mobile
        this.scale=1;
		this.dCont=undefined;
        this.main=main
        this.par=main
        this.otstup=5;
        this._free=true;
        this.dCont=new DCont(document.body);        
        this.dCV=new DCont(); 
        dcmParam.activButton="#f28044";
        this.debug=this.par.debug;

        this.menu=undefined
        //new DButton(main.contentHTML,0,0,"this.down") 

        //this.saveLoacal=new SaveLoacal(this)
       // this.saveProdukt=new SaveProdukt(this)

        this.ser = window.location.href;
        var arrParams = this.ser.split("?");   
        var aa=arrParams[0].split("index");

        this.resurs="resources/";         
        //new Calc();    

        //порезаный от пикси вювер
        this.visi3D = new MVisi3D(main.contentHTML, null, dcmParam.mobile, true, false, true, true);     
        this.visi3D.yes3d = true;           
        this.visi3D.groupObject.add(this.content3d);


        //ловим и откидываем на сцену изменение камеры
       /* this.visi3D.fun_rotationZ = function () { 
            trace(self.visi3D.yVerh, self.visi3D.zVerh, "   ",self.visi3D.zume)
            trace(self.visi3D.rotationX, self.visi3D.rotationZ, "   ",self.visi3D.zume)
        }*/

        this.rec=function(c){            
            if(c.parent)this.rec(c.parent)
        }
        this.rec(self.content3d)

        //хрень принемашка ресурсов и настроек камеры для 
        this.sceneSB=new SceneSB(this.visi3D);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (main.objectBase.scene[this.sceneSB.array[i].name] === undefined) {
                main.objectBase.scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(main.objectBase.scene[this.sceneSB.array[i].name]);
        }
        //this.visi3D.zume=2500


        //this.visi3D.yVerh=-266
        

        //this.pm=new PM(null, main.objectBase);


        this.bvScane=new BVScane(this, main.objectBase, this.visi3D)
        this.bvScane.content3d.rotation.x=-Math.PI/2;
        /*function(s,p){ 
            

            if(self.menu==undefined)return    
            if(s=="naMObj"){                
                self.menu.mObject.setObject(p)
                self.menu.index=1;
            }
        })*/




        if(this.debug == true){
            this.menu=new Menu(this,function(s,p){  

                if(s=="index"){
                    self.menu.index=p;
                    
                }

                if(s=="openVideo"){
                    trace(p)
                    self.menu.mVideo.setObject(self.bvScane.arrVideo[p])
                    self.menu.index=0;
                }

            });
            this.linkGrid='data:image/png;base64,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'
            this.grid=new Grid(this.whSize,this.whSize/100,this.linkGrid,0.7)
            this.grid.position.z=5
            this.content3d.add(this.grid);  

        }else{
            
            this.visi3D.yVerh=-190;           
            this.visi3D.zume=30;
            this.visi3D.rotationX=1.5
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



  		//ап дете сцена деленая на 2 в мейне
		this.update = function () {
			this.visi3D.upDate()
            this.bvScane.update()

		}

        //расчет окна
  		this.sizeWindow = function(w,h,s){    			
  			this.scale=s;
            this.dCont.scale=s            
            this.visi3D.sizeWindow(0,0,w,h);
            if(this.menu!=undefined)this.menu.sizeWindow(w,h,s);
            
  		}





        this.getObj=function() {               
            return this.bvScane.getObj();
        }

        this.setObj=function(o) {
            this.bvScane.setObj(o)
            if(this.menu!=undefined){
                this.menu.setObj(o)
                this.menu.upScane(this.bvScane)
            }
            


        }


        var ss='{"arrVideo":[{"src":"resources/video/videoplayback.webm","active":true},{"src":"resources/video/test.mp4","active":true}],"arrStand":[{"indexVideo":0,"otUp":20,"otLeft":20,"x":0.66,"y":0,"w":0.3400000000000001,"h":1,"width":800,"height":300,"px":400,"py":0,"pz":0,"pr":90},{"indexVideo":0,"otUp":20,"otLeft":20,"x":0,"y":0,"w":0.33000000000000007,"h":1,"width":800,"height":300,"px":-400,"py":0,"pz":0,"pr":-90},{"indexVideo":0,"otUp":20,"otLeft":20,"x":0.33000000000000007,"y":0,"w":0.33000000000000007,"h":1,"width":800,"height":300,"px":0,"py":0,"pz":-400,"pr":180},{"indexVideo":1,"otUp":20,"otLeft":20,"x":0,"y":0,"w":1,"h":1,"width":100,"height":100,"px":244.695,"py":0,"pz":367.042,"pr":44.045},{"indexVideo":0,"otUp":20,"otLeft":20,"x":0,"y":0,"w":1,"h":1,"width":100,"height":100,"px":122.347,"py":0,"pz":421.549,"pr":0}]}'
         var ss=   '{"arrVideo":[{"src":"resources/video/videoplayback.webm","active":true},{"src":"resources/video/test.mp4","active":true}],"arrStand":[{"indexVideo":0,"otUp":8,"otLeft":20,"x":0.66,"y":0,"w":0.3400000000000001,"h":1,"width":800,"height":300,"px":400,"py":0,"pz":-25,"pr":90},{"indexVideo":0,"otUp":8,"otLeft":20,"x":0,"y":0,"w":0.33000000000000007,"h":1,"width":800,"height":300,"px":-400,"py":0,"pz":-25,"pr":-90},{"indexVideo":0,"otUp":8,"otLeft":20,"x":0.33000000000000007,"y":0,"w":0.33000000000000007,"h":1,"width":800,"height":300,"px":0,"py":0,"pz":-425,"pr":180},{"indexVideo":1,"otUp":20,"otLeft":20,"x":0,"y":0,"w":1,"h":1,"width":100,"height":100,"px":72.023,"py":0,"pz":467.429,"pr":44.045},{"indexVideo":0,"otUp":20,"otLeft":20,"x":0,"y":0,"w":1,"h":1,"width":100,"height":100,"px":-48.103,"py":0,"pz":505.653,"pr":0}]}'

        let ccc= JSON.parse(ss);               
        self.setObj(ccc);








  	}

}
