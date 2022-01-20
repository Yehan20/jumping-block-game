//contains classes of the objects
class Circle{
    constructor(size,color,canvas,ctx){
       this.posY=(canvas.height)-47; // 503
       this.posX=canvas.width/2;
       this.radius=size;
       this.color=color;
       this.ctx=ctx;

       this.maxHeight=8;
       this.canJump=false; // ditermines to jump or not
       this.jumpIncrement=0;
       this.maxLimit=0;



    }
    drawCircle(){
        let ctx= this.ctx;
        this.move();
    
        ctx.beginPath();
     
        ctx.arc(this.posX,this.posY,this.radius,0,Math.PI * 2,true);
        ctx.fillStyle=this.color;
        ctx.fill();
       

       
    }

    move(){
        if(this.canJump){
            this.jumpIncrement ++;
          
            if(this.jumpIncrement<15){
                this.posY-=this.maxHeight;
                console.log(this.maxHeight);
                
            }
            else if(this.jumpIncrement>14 && this.jumpIncrement < 19){
                this.posY+=0; // sationairy
            }
            else if(this.jumpIncrement<33){
          
                this.posY+=this.maxHeight;
              
               
            }

            if(this.jumpIncrement>=32){
                this.canJump = false;
           
            }
        }
    }
}