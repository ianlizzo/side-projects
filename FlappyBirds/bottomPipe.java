import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class Pipe here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class bottomPipe extends Actor
{
    /**
     * Act - do whatever the Pipe wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */
    //method sets speed of the pipe to move to the left
    int SPEED = -4;
    public void act() 
    {
        GreenfootImage image = getImage();
        
        setLocation(getX() + SPEED, getY());
    }    
  
}
