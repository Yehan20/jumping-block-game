class Box{
    constructor(ctx,x,y,size,color){
        this.x=x;
        this.y=y;
        this.size=size; 
        this.color=color;
        this.jumpHeight=12,
 
        // this 3 are used for jump configuarations
        this.shouldJump= false,
        this.jumpCounter=0
        this.spin=0;
        this.spinIncrement=90/32; // rotate in one jump
        this.ctx=ctx;
 
    }
 
 
     //jumpMethod
     jump(){
         if(this.shouldJump){
             this.jumpCounter++;
              if(this.jumpCounter<15){
                  // go up
                  this.y-=this.jumpHeight;
                  console.log('one jump');
                  console.log('max ',this.y);
 
              }
 
              else if(this.jumpCounter > 14 && this.jumpCounter< 19){
                  this.y +=0;
                  console.log('float',this.y);
                  //float
              }
 
              else if(this.jumpCounter < 33){
                  ///come down 
                  this.y += this.jumpHeight;
                  console.log('decelerate',this.y);
              }
           
           
 
              // end the circle
 
              if(this.jumpCounter >=32){
                  this.shouldJump=false;
                  this.spin=0; 
                  console.log('final',this.y);
              }
         }
     }
    //draw method
    draw(){
        this.jump();
        console.log('function called');
        let ctx=this.ctx;
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size);
      
    }
 }



 class Block{
    constructor(canvas,size,speed){ 
             this.x = canvas.width + size;
             this.y = 400 - size;
             this.size= size;
             this.color='red';
             this.slideSpeed =speed;
             this.ctx=ctx;
 
    }
    draw(){
        let ctx=this.ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.size,this.size); // where shoud they come from in this canvas
    }
    slide(){
        this.draw();
        this.x-=this.slideSpeed;
    }
 }
 