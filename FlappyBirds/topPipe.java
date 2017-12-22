 import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class topPipe here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class topPipe extends Actor
{
    /**
     * Act - do whatever the topPipe wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */
    //method sets speed of the pipe to move to the left
    public void act() 
    {
         GreenfootImage image = getImage();
        
        setLocation( getX() - 4, getY());
    }    
}
