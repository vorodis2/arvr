

import { Glaf } from './Glaf.js';


export class Main  {
  	constructor(fun) {  		
  		this.type="Main";
  		this.fun=fun
  		var self=this;
		this.glaf=null;
		this._width=100;
		this._height=100;
		self.resolution=1
		self.objectBase=null
		self.confText=null 

        this.debug=false
		this.contentHTML= document.createElement('div');
		this.contentHTML.style.position = 'fixed';
		this.contentHTML.style.top = '0px';
		this.contentHTML.style.left = '0px';
		document.body.appendChild(this.contentHTML);  		


		//создание сцены
  		this.start = function () {			           

            this.fina();
            this.tick(); 
		};

		function animate() {
			requestAnimationFrame( animate );
		}

		//стартуем дальше
        this.fina = function () {            	
			self.glaf=new Glaf(self)		
			sizeWindow()
			fun("init");
		}

		//тик размит надва
		var b=true
		this.tick = function () {
			b=!b;
			if(b==true){
				//TWEEN.update();
				if (self.glaf) {
					self.glaf.update();
				}
			}			
			requestAnimationFrame(self.tick );			
		}



		//Маштабим окна 
		this.scale=1;
		var s
  		this.sizeWindow = function(w,h){  			
  			self._width=w;
			self._height=h;
			if (self._width < 800) self._width = 800;
			if (self._height < 600) self._height = 600;
			s= w/self._width;
			if(s>h/self._height)s=h/self._height;
			this.scale = s;
			if(dcmParam.isIE==true)this.scale = 1;			
			
  			if (self.glaf) { 
  				self.glaf.sizeWindow(w, h, this.scale)
  			}			
  		} 

  		this.start()
  	}
}







