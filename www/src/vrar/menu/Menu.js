
/**/
import { MVideo } from './MVideo.js';
import { MObject } from './MObject.js';
import MReflection from './MReflection'
import { MGetSet } from './MGetSet.js';


export class Menu  {
  	constructor(par,fun) {  		
  		this.type="Menu";
  		var self=this;
        this.par=par
        this.fun=fun
        this._index=-1;
        this._id=-1;

        this.otstup=4;
        this.otstup1=10;
        this.wh=34;

        this.dCont=new DCont(par.dCont);


        this.panel=new DPanel(this.dCont,this.otstup,this.otstup)
        this.panel.height= this.wh +  this.otstup*2;

        this.array=[]

        this.array[0] = this.mVideo = new MVideo(this,function(s,p){
            self.fun(s,p);
        },0);

        this.array[1] = this.mObject = new MObject(this,function(s,p){
            self.fun(s,p);
        },1);

        this.array[2] = this.mReflection = new MReflection(this, function (s, p) {
            self.fun(s, p);
        }, 2);

        
        const ThreeStats = function () {
            var n = Date.now(), p = n, g = 0, q = Infinity, r = 0, h = 0, t = Infinity, u = 0, v = 0, w = 0, f = document.createElement("div"); window.onload = function () { document.getElementById("stats").style.top = document.documentElement.clientHeight - 100 + "px" }; f.id = "stats"; f.addEventListener("mousedown", function (b) { b.preventDefault(); x(++w % 2) }, !1); f.style.cssText = "position:fixed; width:65px; height: 40px;border-width: 3px 3px 1px 1px;border-style: solid;border-color: rgb(255, 255, 255);border-image: initial; opacity:0.9;cursor:pointer";
            var a = document.createElement("div"); a.id = "fps"; a.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002"; f.appendChild(a); var k = document.createElement("div"); k.id = "fpsText"; k.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px"; k.innerHTML = "FPS"; a.appendChild(k); var c = document.createElement("div"); c.id = "fpsGraph"; c.style.cssText = "position:relative;width:54px;height:27px;background-color:#0ff"; for (a.appendChild(c); 54 > c.children.length;) {
                var l =
                    document.createElement("span"); l.style.cssText = "display:block; width:1px;height:22px;float:left;background-color:#113"; c.appendChild(l)
            } var d = document.createElement("div"); d.id = "ms"; d.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none"; f.appendChild(d); var m = document.createElement("div"); m.id = "msText"; m.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:7px;font-weight:bold;line-height:10px"; m.innerHTML = "MS"; d.appendChild(m); var e = document.createElement("div");
            e.id = "msGraph"; e.style.cssText = "position:relative;width:57px;height:27px;background-color:#0f0"; for (d.appendChild(e); 57 > e.children.length;)l = document.createElement("span"), l.style.cssText = "display:block;width:1px;height:22px;float:left;background-color:#131", e.appendChild(l); var x = function (b) { w = b; switch (w) { case 0: a.style.display = "block"; d.style.display = "none"; break; case 1: a.style.display = "none", d.style.display = "block" } }; return {
                REVISION: 11, domElement: f, setMode: x, begin: function () { n = Date.now() }, end: function () {
                    var b =
                        Date.now(); g = b - n; q = Math.min(q, g); r = Math.max(r, g); m.textContent = g + " MS (" + q + "-" + r + ")"; var a = Math.min(25, 25 - g / 200 * 25); e.appendChild(e.firstChild).style.height = a + "px"; v++; b > p + 1E3 && (h = Math.round(1E3 * v / (b - p)), t = Math.min(t, h), u = Math.max(u, h), k.textContent = h + " FPS (" + t + "-" + u + ")", a = Math.min(25, 25 - h / 100 * 25), c.appendChild(c.firstChild).style.height = a + "px", p = b, v = 0); return b
                }, update: function () { n = this.end() }
            }
        };

        this.statsCont = new DCont(this.dCont);
        this.statsCont.y = this.otstup - 1;
        this.stats = new ThreeStats()
        this.stats.domElement.style.position = 'fixed'
        this.stats.domElement.style.left = 0
        this.statsCont.div.appendChild(this.stats.domElement);
        
        this.par.visi3D.arrayDoRender.push(() => {
            this.stats.update();
        })


        this.array[3] = this.mGetSet = new MGetSet(this,function(s,p){
            self.fun(s,p);
        },3);

    


        this.setObj = function(o){ 

            this.mGetSet.setObj(o)
        }


        this.upScane = function(bvScane){ 
            this.mVideo.setScane(bvScane)
            this.mReflection.setObject(bvScane.bvReflection)
            this.mReflection.mAdditional.setObject(bvScane.bvAdditional)
        }



  		this.sizeWindow = function(w,h,s){ 
      		this.mVideo.sizeWindow(w,h,s);
            this.mObject.sizeWindow(w,h,s);/**/
            this.mGetSet.sizeWindow(w,h,s);

            this.panel.width=w/s-this.otstup*2
            this.statsCont.x = this.panel.width - 65;
  		}

  	}

    set index(value) {
        if(this._index!=value){
            this._index= value; 
            for (var i = 0; i < this.array.length; i++) {
                if(this.array[i]){
                    if(this._index==i)this.array[i].active=true
                    else this.array[i].active=false 
                }
            }      
        }
    }    
    get index() { return  this._index;}  
}
