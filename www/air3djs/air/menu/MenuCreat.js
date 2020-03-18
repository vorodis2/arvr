




export class MenuCreat  {
  	constructor(main) {  		
  		this.type="MenuCreat";
        this.par=main
  		var self=this;
        this.mobile = this.par.mobile;
        this.debug = this.par.debug;
        this.wh=this.par.wh;
        this.otstup=this.par.otstup;

        var tBase=this.par.par.tBase;
        var visi3D=this.par.par.visi3D;
        this.arrCreat=[]
        this.boolCreat=false
        this.dCont=new DCont(this.par.dCont);    
    


        this.b=new DButton(this.dCont,this.otstup*2,this.otstup*2,"g",f=>{
            let o =tBase.getObj();
            let s = JSON.stringify(o);
            self.input.text=s;
        })
        this.b.height=this.b.width=this.wh-this.otstup*2;


        this.b1=new DButton(this.dCont,this.otstup+this.wh,this.otstup*2,"s",f=>{
            let o = JSON.parse(self.input.text);
            tBase.setObj(o);
        })
        this.b1.height=this.b1.width=this.wh-this.otstup*2; 


        this.input=new DInput(this.dCont,this.otstup*5+this.wh,this.otstup*2,"null",f=>{
            
        })
        this.input.height=this.wh-this.otstup*2;

        setTimeout(function() {
            self.input.text='{"array":[{"p":{"x":45.11448878548964,"y":-375.6799234908446,"z":326.2571658430492},"p1":{"x":-322.048684935634,"y":-332.3780007228885,"z":188.3122559150207},"style":"plus100"},{"p":{"x":399.3910120701557,"y":-298.1357676490247,"z":-30.004468994922423},"p1":{"x":260.25508667050735,"y":-326.07077562401093,"z":275.0937483504934},"style":"plus100"}]}'
            let o = JSON.parse(self.input.text);
            tBase.setObj(o);
        }, 10);



        this.button=new DButton(this.dCont,this.input.x+this.input.width+this.otstup,this.otstup*2,"Creat",f=>{
            self.button.color=dcmParam.activButton;

            self.creat()
        })
        this.button.height=this.wh-this.otstup*2;



        this.chek=new DCheckBox(this.dCont,320,this.otstup*2,"alwaysRender",f=>{
            
        })
        this.chek.value=true


        this.chek1=new DCheckBox(this.dCont,450,this.otstup*2,"debugger",f=>{
            tBase.contDebag.visible=this.chek1.value
        })
        this.chek1.value=true




        



    

        this.down = function (e) {
            if(self.boolCreat == true){
                if(e && e.target && e.target.name=="sphereBase"){
                    
                    
                    self.arrCreat.push(new THREE.Vector3(e.point.x,e.point.z,-e.point.y))
                    if(self.arrCreat.length==2){
                        self.button.color=dcmParam.color;  
                        let obj=tBase.creat(self.arrCreat[0],self.arrCreat[1]);                        
                        self.par.menuTraject.setObj(obj)
                        self.boolCreat=false;
                        self.arrCreat=[] 
                    }

                }
            }       
        }


        this.creat = function () {
            this.boolCreat=true;     
        }


        visi3D.addEvent("down", this.down);




        var num=0;
		this.upDate = function () {

            if(this.chek.value==true){
                
                num+=0.1;
                if(num>=100)num=0;
                tBase.setAllValue(num)
            }
		    

		}


      
  		this.sizeWindow = function(w,h,s){ 

            
  		}

  	}









}
