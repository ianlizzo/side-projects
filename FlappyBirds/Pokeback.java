import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class Pokeback here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Pokeback extends World
{

    /**
     * Constructor for objects of class Pokeback.
     * 
     */

    int pipeCounter = 0; //ticks of pipes

    int flappyCounter = 0;//score count
    int PIPE_SPACING = 150;//spaces between pipes
    int score = 0;
    int FIRST_PIPE = 240;//First pipe tick counter
    bottomPipe[] botPipeArray = new bottomPipe[10000];//Creates new array that stores a bunch of pipes
    topPipe[] topPipeArray = new topPipe[10000];
    int botIndex = 0;
    int topIndex = 0;

    
    public Pokeback()
    {    
        // Create a new world with 600x400 cells with a cell size of 1x1 pixels.
        super(600, 400, 1, false); 
        
        //sets the order of the images
        setPaintOrder(bottomPipe.class, topPipe.class, Pikachu.class, GameOver.class);

        // Create a Pikachu Object
        Pikachu pika = new Pikachu();

        // Add pikachu gif to the background
        addObject(pika, 100, getHeight()/2);
    }

    public void act() {
        //Counts the ticks of act method
        pipeCounter++;
        //For every 50 ticks, creates the two pipes
        if (pipeCounter % 50 == 0) {
            createPipes(); 


        }
        if (pipeCounter >= 120){
            flappyCounter++;
            //Keeps score for the ticks passed
            if (flappyCounter % 50 == 0) {
                score++;

                System.out.println(score);
            }   
            
        }

    }
    private void createPipes() {
        // Bottom Pipe
        // Creates an array to hold all the pipes
        //randomize lengths from 30 to 120 height
        int offset = Greenfoot.getRandomNumber(120)+30;
        botPipeArray[botIndex] = new bottomPipe();
        addObject(botPipeArray[botIndex], getWidth(), getHeight() + botPipeArray[botIndex].getImage().getHeight()/2 - offset);
        botIndex++;

        // Top Pipe
        //Same thing as bottom pipe
        offset = Greenfoot.getRandomNumber(120)+30;
        topPipeArray[topIndex] = new topPipe();
        addObject(topPipeArray[topIndex], getWidth(), getHeight() - topPipeArray[topIndex].getImage().getHeight()/2 - 400 + offset);
        topIndex++;

    }

}