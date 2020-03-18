




export class MenuTraject  {
  	constructor(main) {  		
  		this.type="MenuTraject";
        this.par=main;
  		var self=this;
        this.mobile = this.par.mobile;
        this.debug = this.par.debug;
        this.wh=this.par.wh;
        this.wMenu=this.par.wMenu;
        this.otstup=this.par.otstup;
        this._active=false;
        
        this.dCont=new DCont(this.par.dCont);    
    
        this.dCont.visible=this._active;

        var tBase=this.par.par.tBase;
        var visi3D=this.par.par.visi3D;


        this.window=new DWindow(this.dCont,this.otstup,this.wh+this.otstup*2,"Traject");
        this.window.width=this.wMenu;
        this.window.hasMinimizeButton=false;
        



        var yy=this.otstup;
        this.array=[]
        this.arrStyle=["plus"]
        this.array[2]=new DComboBox(this.window.content,this.otstup,yy,this.arrStyle,f=>{

        })
        this.array[2].width=this.wMenu-this.otstup*2        
        yy+=42;

        this.arrStyle2=['catmullrom','centripetal','chordal']
        this.array[6]=new DComboBox(this.window.content,this.otstup,yy,this.arrStyle2,f=>{
            self.object.style2=this.arrStyle2[this.array[6].index]
        })
        this.array[6].width=this.wMenu-this.otstup*2        
        yy+=42;




        this.array[0]=new DButton(this.window.content,this.otstup,yy," ",f=>{
            
            setTimeout(function() {
                self.startBut(0,true)
            }, 10);
        })
        this.array[0].width=this.wMenu-this.otstup*2        
        yy+=42;

        this.array[1]=new DButton(this.window.content,this.otstup,yy," ",f=>{
            setTimeout(function() {
                self.startBut(1,true)
            }, 10);
        })
        this.array[1].width=this.wMenu-this.otstup*2        
        yy+=42;



        this.array[3]=new DSliderBig(this.window.content,this.otstup,yy,f=>{
            self.object.amountPoints=this.array[3].value
        },"amountPoints",3,20)
        this.array[3].width=this.wMenu-this.otstup*2      
        this.array[3].okrug=1  
        yy+=52;


        this.array[4]=new DSliderBig(this.window.content,this.otstup,yy,f=>{
            self.object.sPnum=this.array[4].value
        },"sPnum",0,200)
        this.array[4].width=this.wMenu-this.otstup*2      
        this.array[4].okrug=1  
        yy+=52;


        this.array[5]=new DSliderBig(this.window.content,this.otstup,yy,f=>{
            self.object.value=this.array[5].value;
        },"value",0,99.999)
        this.array[5].width=this.wMenu-this.otstup*2      
        this.array[5].okrug=1000  
        yy+=52;

        this.window.height=yy+32;







        this.dragMenu=function(){
            for (let i = 0; i < self.arrStyle.length; i++) {
                if(self.arrStyle[i]==self.object.style){
                    self.array[2].index=i
                    break;
                }
            }

             for (let i = 0; i < self.arrStyle2.length; i++) {
                if(self.arrStyle2[i]==self.object.style2){
                    self.array[6].index=i
                    break;
                }
            }



            let s="0 x:"+Math.round(self.object.position.x)+" y:"+Math.round(self.object.position.y)+" z:"+Math.round(self.object.position.z);
            self.array[0].text=s;

            s="1 x:"+Math.round(self.object.position1.x)+" y:"+Math.round(self.object.position1.y)+" z:"+Math.round(self.object.position1.z);
            self.array[1].text=s;

            this.array[3].value=self.object.amountPoints
            this.array[4].value=self.object.sPnum
            this.array[5].value=self.object.value
        }




        this.object    
        this.setObj=function(obj){
            this.object = obj;
            this.active=true;

            this.dragMenu();
        }  







        this.getParName=function(c3d,name){            
            if(c3d[name]!=undefined)return c3d[name];
            if(c3d.parent!=undefined)return this.getParName(c3d.parent,name);
            return null
        } 


        self.mouseup=function(){
            self.startBut(0,false);
            self.intDrag=-1;
            visi3D.position3d.pause=false;
            visi3D.event3DArr.poiskName =  undefined;
            if(dcmParam.mobile==false){             
                document.removeEventListener("mouseup", self.mouseup);
            }else{                  
                document.removeEventListener("touchend", self.mouseup);                
            }
        }

        dcmParam.activButton="#f28044"

        this.intDrag=-1;
        this.startBut = function (num, bool) {
            self.intDrag=num
            visi3D.position3d.pause=true;
            visi3D.event3DArr.poiskName =  'sphereBase';
            if(bool==true){
                
                self.array[num].color=dcmParam.activButton;
                if(dcmParam.mobile==false){             
                    document.addEventListener("mouseup", self.mouseup);
                }else{                  
                    document.addEventListener("touchend", self.mouseup);                
                }
            }else{
                self.array[0].color=self.array[1].color=dcmParam.color;                
            }
        }




        this.down = function (e) {
            if(e && e.target){
                if(e.target.name.indexOf('arrayDebug')!=-1){                  
                    let gObj=  self.getParName(e.target,"gObj")                    
                    if(gObj!=null){
                        self.setObj(gObj);
                        let a = e.target.name.split("_")
                        if(a[1]=="0"){
                            self.startBut(0, true)
                        }
                        if(a[1]=="1"){
                            self.startBut(1, true)
                        }
                    }
                } 
            }               
        }
 
        this.move = function (e) {
            if(e && e.target){
                if(self.intDrag!=-1){   
                   // self.object.arrayPosit[self.intDrag].setPoint( new THREE.Vector3(e.point.x,-e.point.y,e.point.z))                
                    self.object.arrayPosit[self.intDrag].set(e.point.x,e.point.z,-e.point.y);
                    self.object.drag(true);
                    self.dragMenu();
                }                    
            }
        }


        visi3D.addEvent("down", this.down);
        visi3D.addEvent("move", this.move);


      
  		this.sizeWindow = function(w,h,s){            
            
  		}

  	}

    set active(value) {
        if(this._active!=value){
            this._active= value;          
            this.dCont.visible=this._active;
                          
        }
            
    }    
    get active() { return  this._active;}


}
