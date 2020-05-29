---
layout: posts
title: Making a Snake Game
categories: individual
author:
  name: Marcus Cheong
  class: '1.09'
---

This project was my first real project I ever really took the time to properly finish, and it was quite an enriching experience for me. I learnt more about python and more specifically, pygame, which before this I was quite inexperienced in. 

I began by trying to plan the code out in my head. I decided where roughly each part of the code will be, but other than that it was a very simple plan. On hindsight, I should have spent more work and time on the plan, and not have rushed into the code. 

Next, after setting up the main screen and other things like the icon and title, I made the background for the game. I wanted the background to be similiar to that of a chess board, except the tiles are alternating between black and grey. The background actually took me quite a bit of time as I was not yet familiar with functions like ‘get_rect’, ‘draw.rect’, and blit, and the differences between them. I took some time before I fully grasped them and managed to write the code properly. 

```python
cells = [(x,y,cellwidth,cellwidth) for y in range(40,screeny,cellwidth) for x in range(0,screenx,cellwidth)] 
cellcounter = 0 
background = pygame.Surface(size).convert() 
for item in cells: 
	cellcounter +=1 
	if cellcounter % 2 == 0: 			
		pygame.draw.rect(background,(50,50,50),item) 
```


I first made a list of all the different cells in the game. Each item in the list contained the ‘rectangle’ information for each cell- its x position, y position, width, and height. Then I created a new black screen called ‘background’, and drew a grey square into alternate cells. 

Next, I added the code for the snake. At first I wanted to use a list of the cells that the snake occupied, but I was not sure how to add in collision logic later on. I also considered using variables for the snake head’s x and y coordinates. In the end I used both. 

python
snakecells = [] 
snakeheadx,snakeheady = cells[131][0],cells[131][1]

The snake head x and y here are the fixed starting positions of the snake

For the snake’s movement, I used a variable ‘direction’. It is assigned -1 for left, 1 for right, -2 for up, and 2 for down. Then, the x coordinate of the snake will move by 32 ( the length of 1 cell) * direction for left or right, and the y coordinate 32 / 2* direction (as direction is 2). 

```python
if abs(direction) == 1: 
	snakeheadx += cellwidth * direction
elif abs(direction) == 2: 
	snakeheady += cellwidth / 2 * direction 
```

If the snake does not collide with anything and all is well, the first element of the list snakecells (if any) is removed and the cell with the x and y coordinates of the snakehead will be appended to the list snakecells. 

```python
if len(snakecells) > 0: 
	snakecells.pop(0) 
for i in range(len(cells)): 
	if cells[i][0:2] == (snakeheadx,snakeheady): 
		snakecells.append(cells[i]) 
```

For collision logic, there are 2 ways the snake can die. 1) it hits its head to the wall, 2) it hits against itself. For hitting against the wall, the program checked whether the x and y coordinates of the snake is beyond the width and height of the screen. 

```python
if snakeheadx < 0 or snakeheadx > screenx or snakeheady < 0 or snakeheady > screeny: 
	game_over = True
```

For if the snake hits against itself, I made a set of the list snakecells and compared its length with that of the list snakecells. This part is actually after the part about updating ‘snakecells’, as I needed the cell information of the current cell head, and whether that information was already in ‘snakecells’, which would have meant the snake collided against itself. 

```python
if not len(snakecells) == len(set(snakecells)): 
	game_over = True 
```

Fourthly was the code for the apples the snake ate. The apples in my snake game were quite simple, they were just a red circle. 

```python
pygame.draw.circle(screen,(0,255,0),(applex+ round(cellwidth / 2),appley + round(cellwidth / 2)),round(cellwidth / 2)) 
```

Next for the apple, I wrote in the logic of what would happen when the snake ‘ate’ the apple. 

```python
appleEaten = False 
if applex == snakeheadx and appley == snakeheady: 
	appleEaten = True 
if appleEaten: 
	length += 1 
	applepos = 0 
```

Whenever, the program ran through the main while Loop, the variable ‘appleEaten’ will be set to false. Then, if the snake had eaten the apple( if the head of the snake’s x and y coordinates were equal to those of the apples), appleEaten would be set to true, and the length snake will increase by 1. (I also needed to set a variable called applepos, which I will explain more on later). 

Next, I also had to extend the previous statement on removing the oldest element from snakecells, so that it would only be removed if the snake had not eaten an apple on this iteration of the while loop, so that the snake’s length will ‘increase’ properly. 

```python
if len(snakecells) > 0 and not appleEaten: 
	snakecells.pop(0) 
```

About the previously mentioned ‘applepos’ variable, it was for creating the new location for the apple. As zero’s boolean value is False, I used it as a condition for a while loop. The while loop sets applepos to a random value in cells, and if that value is not in snakecells, so that the apple is not going to be in the snake, the x and y coordinates of the apple will be set to that. If the random position in fact is inside snakecells, applepos is set to 0, and the cycle repeats. 

```python
while not applepos: 
	applepos = randint(0, len(cells) + 1) 
	if cells[applepos] not in snakecells: 
		applex,appley = cells[applepos][0],cells[applepos][1] 
	else: 
		applepos = 0 
```

Lastly were the embellishments like the sound and the endscreen. I did not know much about sound and rendering text in pygame, but thanks to this project I managed to learn them. 

Though snake is a very simple game to code compared to other games, the novice that I am had much to learn and had a very fun time doing this project over the course of the weekend. I look forward to doing something like this in the future again