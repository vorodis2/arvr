



export class MVideo  {
  	constructor(par,fun,idArr) {  		
  		this.type="MVideo";
  		var self=this;
        this.par=par
        this.fun=fun
        this.idArr=idArr
        this.otstup=this.par.otstup;

        

        this.wh=this.par.wh;
        this.width=222;

        this._active=false;


        this.button=new DButton(par.panel, this.otstup+idArr*(this.otstup+this.wh),this.otstup,this.type,s=>{
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

        for (var i = 0; i < 4; i++) {
            this.arrBat[i]=new DButton(this.window.content, this.otstup+i*(this.otstup+this.wh),yy,""+i,function(){                
                if(this.alpha>0.9)par.fun("openVideo",this.idArr)                
            })
            this.arrBat[i].idArr=i;
            this.arrBat[i].alpha=0.4;
            this.arrBat[i].width=this.wh
            this.arrBat[i].height=this.wh
        }

        yy+=this.otstup+this.wh
        this.input=new DInput(this.window.content, this.otstup,yy,"resources/video/videoplayback.webm",function(){
            if(self.object){//test.mp4
                self.object.src=this.text;
            }
        });
        this.input.height=this.wh
        this.input.width=this.width-this.otstup*2;

        yy+=this.otstup+this.wh

        let ww=(this.width-this.otstup*3)/2
        this.bPlay=new DButton(this.window.content, this.otstup,yy,"bPlay",function(){
            if(self.object){
                self.object.active=true;
            }
            self.setObject(self.object)
        })
        this.bStop=new DButton(this.window.content, this.otstup*2+ww,yy,"bStop",function(){
            if(self.object){
                self.object.active=false;
            }
            self.setObject(self.object)
        })
        this.bPlay.width=this.bStop.width=ww

        yy+=this.otstup+this.wh

        this.bCreat=new DButton(this.window.content, this.otstup,yy,"Creat Video",function(){
            
            let vidio=self.par.par.bvScane.creatVideo();
            vidio.src=self.input.text;  

            par.fun("openVideo",vidio.idArr) 
            self.setScane(self.par.par.bvScane)
            

        })
        this.bCreat.width=this.width-this.otstup*2;

        yy+=this.otstup+this.wh


        this.bCreat1=new DButton(this.window.content, this.otstup,yy,"Creat Stand",function(){
            
            let stand=self.par.par.bvScane.creatStand();
            stand.indexVideo=self.object.idArr;
            self.par.mObject.setObject(stand);
            self.par.index=1;
        })
        this.bCreat1.width=this.width-this.otstup*2;

        yy+=this.otstup+this.wh



        this.window.height=yy+32;

        this.object
        this.setObject=function(obj){
            
            this.object=obj;

            this.input.text=this.object.src;

            for (var i = 0; i < this.arrBat.length; i++) {
                if(i!=obj.idArr)this.arrBat[i].color= dcmParam.color;
                else  this.arrBat[i].color= dcmParam.activButton;
            }

            if(self.object.active==true){
                this.bStop.color= dcmParam.color;
                this.bPlay.color= dcmParam.activButton;
            }else{
                this.bStop.color= dcmParam.activButton;
                this.bPlay.color= dcmParam.color;
            }
        }

        this.setScane=function(_scane){
            for (var i = 0; i < this.arrBat.length; i++) {
                this.arrBat[i].alpha=0.7;
            }
            for (var i = 0; i < _scane.arrVideo.length; i++) {
                this.arrBat[i].alpha=1;
            }
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
