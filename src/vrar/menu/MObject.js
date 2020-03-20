



export class MObject  {
  	constructor(par,fun,idArr) {  		
  		this.type="MObject";
  		var self=this;
        this.par=par
        this.fun=fun
        this.idArr=idArr
        this.otstup=this.par.otstup;

        this.wh=this.par.wh;
        this.width=222;

        this._active=false;


        this.button=new DButton(par.panel, this.otstup+idArr*(this.otstup+100),this.otstup,this.type,s=>{
            this.fun("index",this.idArr);
        })
        




        this.dCont=new DCont(par.dCont);
        this.dCont.y=this.wh+this.otstup*4;
        this.dCont.x=this.otstup;
        this.dCont.visible=this._active

        this.window=new DWindow(this.dCont,0,0,this.type);
        this.window.width=this.width;
        this.window.hasMinimizeButton=false;
        this.window.dragBool=false;

        var yy=this.otstup;//test.mp4

        this.input=new DInput(this.window.content, this.otstup,yy,"0",function(){            
            self.object.indexVideo = this.value*1;
        });
        this.input.height=this.wh
        this.input.width=this.wh;

        this.bbb=new DButton(this.window.content, this.otstup*2+this.wh,yy,"on Video",function(){
            par.fun("openVideo",self.object.indexVideo)       
        })
        this.bbb.width=this.width-this.bbb.x-this.otstup

        yy+=this.otstup+this.wh


        this.slid=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.width=  this.value  
        }, "width",  50, 1000)
        this.slid.width=this.width-this.otstup*2;
        this.slid.okrug=1;
        yy+=42

        this.slid1=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.height=  this.value  
        }, "height",  50, 500)
        this.slid1.width=this.width-this.otstup*2;
        this.slid1.okrug=1;
        yy+=42

        this.slid2=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.otUp =  this.value 
        }, "otUp",  0, 500)
        this.slid2.width=this.width-this.otstup*2;
        this.slid2.okrug=1;
        yy+=42

        this.slid3=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.otLeft =  this.value  
        }, "otLeft",  1, 200)
        this.slid3.width=this.width-this.otstup*2;
        this.slid3.okrug=1;
        yy+=42;


        this.slid_x=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.x =  this.value  
        }, "x",  0, 1)
        this.slid_x.width=this.width-this.otstup*2;
        this.slid_x.okrug=1000;
        yy+=42;


        this.slid_y=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.y =  this.value  
        }, "y",  0, 1)
        this.slid_y.width=this.width-this.otstup*2;
        this.slid_y.okrug=1000;
        yy+=42;


        this.slid_w=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.w =  this.value  
        }, "w",  0, 1)
        this.slid_w.width=this.width-this.otstup*2;
        this.slid_w.okrug=1000;
        yy+=42;


        this.slid_h=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.h =  this.value  
        }, "h",  0, 1)
        this.slid_h.width=this.width-this.otstup*2;
        this.slid_h.okrug=1000;
        yy+=42;




        this.slid_px=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.px=  this.value  
        }, "px",  -1000, 1000)
        this.slid_px.width=this.width-this.otstup*2;
        this.slid_px.okrug=1000;
        yy+=42;

        this.slid_py=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.py =  this.value  
        }, "py",  -1000, 1000)
        this.slid_py.width=this.width-this.otstup*2;
        this.slid_py.okrug=1000;
        yy+=42;

        this.slid_pz=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.pz =  this.value  
        }, "pz",  -1000, 1000)
        this.slid_pz.width=this.width-this.otstup*2;
        this.slid_pz.okrug=1000;
        yy+=42;        

        this.slid_pr=new DSliderBig(this.window.content, this.otstup,yy, function(s){ 
            self.object.pr =  this.value  
        }, "pr",  -180, 180)
        this.slid_pr.width=this.width-this.otstup*2;
        this.slid_pr.okrug=1000;
        yy+=42;






        this.window.height=yy+48;
        
        this.array=[];

        this.object;
        this.setObject=function(obj){
            this.object=obj;
            this.slid.value=this.object.width;
            this.slid1.value=this.object.height;
            this.slid2.value=this.object.otUp;
            this.slid3.value=this.object.otLeft;   


            this.slid_x.value=this.object.x 
            this.slid_y.value=this.object.y 
            this.slid_w.value=this.object.w 
            this.slid_h.value=this.object.h 

            this.slid_px.value=this.object.px;
            this.slid_py.value=this.object.py; 
            this.slid_pz.value=this.object.pz; 
            this.slid_pr.value=this.object.pr; 

            this.input.text=this.object.indexVideo+"";


        }


        this.sizeWindow = function(w,h,s){ 
            //this.dCont.x= w/s-this.width -   this.otstup   
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
