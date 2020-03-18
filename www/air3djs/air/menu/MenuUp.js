




export class MenuUp  {
  	constructor(main) {  		
  		this.type="MenuUp";
        this.par=main
  		var self=this;
        this.mobile = this.par.mobile;
        this.debug = this.par.debug;
        this.wh=this.par.wh;
        this.otstup=this.par.otstup;

        
        this.dCont=new DCont(this.par.dCont);    
    

        this.panel=new DPanel(this.dCont,this.otstup,this.otstup)
        this.panel.height=this.wh;


        





		this.update = function () {

		
		}

      
  		this.sizeWindow = function(w,h,s){            
            this.panel.width=w/s-this.otstup*2
  		}

  	}




}
