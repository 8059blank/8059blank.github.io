---
layout: posts
title: The Artist's Masterpiece
categories: individual
---

By Nicholas Quek

[EXE Download](../../projects/indiv/2020-05-11-artists-masterpiece/Artists-Masterpiece.exe) 

(Note: This game can only be played if you download Adobe Flash Like getting a Nintendo to play Super Mario)

Greetings and welcome to the Write Up on my recently created game, **The Artist's Masterpiece**.

The game is a combination of **Platforming** and **Basic Combat**. Through a plethora of enemies and levels, the game nurtures and challenges one's **Reflexes**, **Observation** and **Timing**. You may be up to the challenge.

I was most inspired by the game **Hollow Knight**, and from this brainchild sprouted my greatest Programming Achievement yet. However, not all in the world was flowery in the creation of this game.

So, lets journey through the creation process of my game, make your judgements of my game through your eyes.

## What is the game about?

Set in a 2D world of Pencil Drawings and Oil Paintings, The Artist's Masterpiece takes place through the eyes of an enigmatic White Dot, whom you control.

Sealed in a temple is a chained, dark figure, whose stasis is ending.

Mystery is the guiding force in The Artist's Masterpiece, meet friend and foe across this land. Beginning in a land of Towering Trees and Pink Mushrooms, journey down into the painted mines and ascend the floating cliffs. However, to reach these destinations, the skill of battle is required. Are you willing to challenge the Three Guardians of these Biomes?

## Introducing the Game Controls to the Player

The game has a **two basic controls**, with a few added along the way. These two are Moving and Swinging your Pencil. (WASD and Space Key)

The Basics of the game are (In my opinion) elegantly introduced, mostly through **observation rather than text**. Hollow Knight was my guiding light. In its tutorial, the player is locked in a room with several crumbling walls, your instinct? Break them, one by one, to escape. When an enemy was encountered, the now sharpened instinct of "Hit it" kicked in.

In my opinion, this creates a more subtle way of teaching the player, and immerses the player deeper into the interactive environment he/she is in. Most people enjoy learning, but few enjoy being taught, thus this is the most effective way to teach the player must-know nuggets of knowledge (In my opinion).

In "Artist's Masterpiece", this is easily shown in Level 3. There is a worm-like creature which must be killed before the player may progress. This is also the first level where the player can take damage (from **Black Paint**). The Worm and Player are positioned with a chasm between them, one misstep dropping either into the Blackness. However, if the player gets closer to the worm, the worm charges, but falls into the chasm, emitting a **hissing-burning sound** when it hits the black substance.

The Worm dies, and the player realizes -- "Black Paint is harmful to me, as well as to enemies." Thus, the player learns to avoid anything that is black, a lesson learned without words.

## The Adventure Begins (And how I created it)

Artist's Masterpiece is designed to be simple up until Level Four, (There are 19 Levels in all), I consider the first three levels as the tutorial. From that point on, it is easier to take damage.

### Damage Detection

However, I ran into some problems while programming **Damage Detection**. Majority of games have a **hitbox** to detect whether The Player is in Contact with the Weapon of an Enemy, but as "Artist's Masterpiece was programmed on **Scratch**, I Decided to use a more space efficient Method.

### Colour Detection
In the Creation of "Artist's Masterpiece", the following code was used to cause damage when The Player hit the **Colour Black:**

![](../projects/indiv/2020-05-11-artists-masterpiece/image001.png)

This saves me from the creation of hitboxes, Halving the total number of sprites which would be required to be created.

### The Creation of The World

In My Mind, the creation of the world of Artist's Masterpiece is divided into 3 groups. **Combat, level Design** and lastly, **Enemy Design**. These Three Juggernauts of game design were each remembered for the challenges that they presented me.

### COMBAT

In Games with combat, **animation** and **sound** are extremely important elements. Imagine this - The Player is absorbed in the misty gladiatorial arena, the enemy moves quick, and through the fog, lands a hit on the player.

In A Good Game, there would be **Visual effects** or **sound cues** to let the player know -- Damage has been taken. In the heat of battle, a slight change in character posture may not be noticed, thus in Artist's Masterpiece, the Player Character flashes white for a full half-second (Which may not sound like much, but being over-generous with invincibility frames can be a game's downfall as well.)

### Creating Joyful Combat

There is a fine line between "**Challenging**" and "**Punishing**", In Artist's Masterpiece, **Every Enemy** has its own quirks, and if you master them, the path will be open to you. Bosses are merely beefed up versions of multiple regular enemies, thus testing the player's mastery over the game's mechanics.

Combat should be **engaging, not repetitive.** In Artist's Masterpiece, the Player recoils slightly when attacking, thus forcing the player to make minor adjustments in battle and preventing the spamming of attacks.

### LEVEL DESIGN

My Original Plan for the overall sequence of levels in Artist's Masterpiece was not linear, as creating a non-linear game would be too large for scratch to handle, and take far longer to create. In my opinion, non- linear games are superior to linear ones in terms of exploration, which I did not want Artist's Masterpiece to be lacking in.

### Here is what I did

To Compensate for the lack of exploration coming from the linear gameplay of Artist's Masterpiece, little tidbits of content were added to the world. Only through keen observation and logical deductions could these locations be reached (I will leave you to find these out yourself!) **Secrets** are a major part of the Game-Makers Arsenal. They can promote risk- taking, reward curiosity and make player invest more time in the game.

Thus, drawing from this philosophy, I have buried a chunk of quality content in secret locations, players can journey off the main path of progression.

### And Last but not Least, ENEMY DESIGN

**Designing** both **Basic Enemies** and **Bosses** is **extremely time consuming.** On Average, designing a boss took me two full days to complete. From my experience in designing enemies, I learned to make the code in my game Modular. A **Basic template** of an enemy was created, with every basic function already pre-programmed.

Behavior wise, enemy sprites respond to the player when it is within a certain distance. However, Artist's Masterpiece Is still largely a **platformer**, thus, enemies are specially tailored to test the player's mastery over actions such as **backing up**, **jumping** and **dodging** during combat.


## Conclusion
Overall, this is what I have learnt and implemented during the creation of the "Artist's Masterpiece"

1.  Teaching player game mechanics should be implemented through **Showing, not Telling**, unconscious mastery over controls often leads to greater absorption into the game.

2.  Be **Space** and **time efficient**. If you start with a disadvantage (In my case software capabilities), make the best out of available resources, find a cost-effective method to solve the problem.

3.  Stay true to the type of game being created, build the game around the basic mechanics of the game to keep the gameplay constant.
