



export class MGetSet  {
  	constructor(par,fun,idArr) {  		
  		this.type="MGetSet";
  		var self=this;
        this.par=par
        this.fun=fun
        this.idArr=idArr
        this.otstup=this.par.otstup;

        this.wh=this.par.wh;
        this.width=222;

        this._active=false;


        this.button=new DButton(par.panel, this.otstup+idArr*(this.otstup+100),this.otstup,this.type,s=>{
            this.fun("index",this.idArr)
        })



        this.dCont=new DCont(par.dCont);
        this.dCont.y=this.wh+this.otstup*4;
        this.dCont.x=this.otstup;
        this.dCont.visible=this._active

        this.window=new DWindow(this.dCont,0,0,this.type);
        this.window.width=this.width;
        this.window.hasMinimizeButton=false;
        this.window.dragBool=false;



       
        this.arrBat=[];
        var yy=this.otstup




        this.input=new DInput(this.window.content, this.otstup,yy,"null",function(){
            
        });
        this.input.height = this.wh;
        this.input.width = this.width-this.otstup*2;

        yy+=this.otstup+this.wh;

        let ww=(this.width-this.otstup*3)/2
        this.b0=new DButton(this.window.content, this.otstup,yy,"getObj",function(){
            let ccc=self.par.par.getObj();          
            let str=JSON.stringify(ccc);            
            self.input.text=str;
        })
        this.b1=new DButton(this.window.content, this.otstup*2+ww,yy,"setObj",function(){
            let ccc= JSON.parse(self.input.text);               
            self.par.par.setObj(ccc);
        })
        this.b1.width=this.b0.width=ww;

        yy+=this.otstup+this.wh;


        this.window.height=yy+32;


        this.setObj = function(o){ 
            //this.mGetSet.setObj(o)
            trace("#############################",o)
            let str=JSON.stringify(o);            
            self.input.text=str;
        }




       


        

        this.object
        this.setObject=function(obj){
            this.object=obj;
            this.input.text=this.object.src;
        }

        this.setScane=function(_scane){
            for (var i = 0; i < _scane.arrVideo.length; i++) {
                this.arrBat[i].alpha=1;
            }
        }



        this.sizeWindow = function(w,h,s){ 
            //this.dCont.x= w/s-this.width -   this.otstup 
            /*this.panel.width=  w/s;
            this.panel.height=  h/s;

            this.w.x=(this.panel.width-this.w.width)/2
            this.w.y=(this.panel.height-this.w.height)/2*/
        }
  	}


    set active(value) {
        if(this._active!=value){
            this._active= value; 
            this.dCont.visible=this._active;

            if(this._active==false)this.button.color= dcmParam.color; 
            else this.button.color=dcmParam.activButton;  


        }
    }    
    get active() { return  this._active;} 

}
