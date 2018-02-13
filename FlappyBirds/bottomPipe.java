import greenfoot.*;  

public class bottomPipe extends Actor
{
    //method sets speed of the pipe to move to the left
    int SPEED = -4;
    public void act() 
    {
        GreenfootImage image = getImage();
        
        setLocation(getX() + SPEED, getY());
    }    
  
}
