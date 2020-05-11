---
layout: posts
title: Flappy Bird Multiplayer
---

[JAR Download](../projects/flappy-bird-multiplayer/FlappyBird001.jar)

## Overview
Flappy bird is the classic game where the bird needs to jump through pipes as long as it can if not it will fall to its doom! Now this version of flappy bird enables local multiplayer!

## Implementation
1. Set up the file (Create your JPanel, JFrame, and etc.)
2. Turn your background into blue through your JPanel
3. import these things
```java
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.InputStream;
import java.net.URL;
import javax.swing.Timer;
import java.util.Random;
```
4. Create green ground below by creating a rectangle
5. Add the moving pipes
    a. Add a timer
    ```java
    Timer t = new Timer(50, new ActionListener() {
    }
    ```

    b. Create pipe with this format
    ```java
    Rectangle r2 = new Rectangle (pipex[0], pipey[0]+250, 80, 1100);
    Rectangle r3 = new Rectangle (pipex[0], 0, 80,pipey[0]+squeeze);
    ``` 
    Explanation:
    * In which `pipex[0]` is x coordinate
    * Y coordinate for top pipe is 0
    * Height of top pipe = `pipey[0] + squeeze` (so pipe can be smaller)
    * Y coordinate for bottom pipe is `pipey[0] + 250` (basically this is how big the pipe is)
    * 80 is width of both pipes
    * (Remember to fill the rectangles with the exact same format)

    c. In the timer write this code so this means that the pipes will move towards the left creating an illusion for the birds
    ```java
    pipex[0]-=constant;
    pipex[1]-=constant;
    pipex[2]-=constant;
    pipex[3]-=constant;
    ```
    d. Write a code so that when the pipes reach a certain x coordinate, it will teleport into another x coordinate, creating a loop
    
    e. If you want, add a randomizer in code d so your pipes can have a bigger variety

6. Add the bird
    a. Add a rectangle which has customizable y coordinate
    b. Add an image corresponding to the rectangle
    c. In the counter make it so that the bird always falls in an accelerating rate
    d. Add a function so when you press the up-key, the bird goes up, the acceleration stops for a few ticks, and the bird also has reduced speed
    e. Make it so that when the Bird intersects with the roof, ground , or pipes it dies (removed from screen)
    f. Repeat for the other bird

7. Add scoreboard
    a. In the timer, add a code in which so every certain amount of ticks a score variable increases
    b. Repeat for the other bird
    c. Show scores on the ground

8. Create dying mechanism
    a. Make it so that when both birds die it switches to game over screen
	b. Show who won, and their respective scores

9. Create a loop so you can restart the game
10. Save in a jar file
11. Your game is done




    
    


