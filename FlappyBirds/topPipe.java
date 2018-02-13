import greenfoot.*;  

public class topPipe extends Actor
{
    //method sets speed of the pipe to move to the left
    public void act() 
    {
         GreenfootImage image = getImage();
        
        setLocation( getX() - 4, getY());
    }    
}
