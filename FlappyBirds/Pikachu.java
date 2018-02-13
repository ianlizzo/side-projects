import greenfoot.*;  

public class Pikachu extends Actor
{
    int changeinY = 0;
    int changeinG = 2;
    int THRUSTERS = -13;
    /**
     * Act - do whatever the Pikachu wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */
    public void act() 
    {
        //This sets the location of Pikachu to the slight left
        setLocation( getX(), (int) getY() + changeinY);
        
        //If pikachu touches the bottom or top pipe, the game ends and the "Wasted" logo is shown. 
        
        if (getOneIntersectingObject(bottomPipe.class) != null) {
     
 
 
        GameOver gameOver = new GameOver();
        getWorld().addObject(gameOver, getWorld().getWidth()/2, getWorld().getHeight()/2);Greenfoot.stop();
    }
        if (getOneIntersectingObject(topPipe.class) != null) {
   
        
        GameOver gameOver = new GameOver();
        getWorld().addObject(gameOver, getWorld().getWidth()/2, getWorld().getHeight()/2);
        Greenfoot.stop();
            
    }   
        
        // If you press the "UP" arrow, the bird moves up 15 pixels.
        if (Greenfoot.isKeyDown("up")== true){
           changeinY = THRUSTERS;
        }
     
        //If Pikachu touches the bottom of the world it ends the game.
        if (getY() > getWorld().getHeight()+2){
        
        GameOver gameOver = new GameOver();
        getWorld().addObject(gameOver, getWorld().getWidth()/2, getWorld().getHeight()/2);
        Greenfoot.stop();
    }
        // Basically the gravity feature is becuase of that instance variable that pulls Pikachu down 2 spaces. 
        changeinY += changeinG; 
   
    }    
}
