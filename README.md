# War-Games
Basic war game with webGL Graphics

# Game Proposal
Michael McElligott
1. Game name.

 	War Games

2. Game concept and basic rules.
War Games is a turn-based game played on a board between two players. The goal is to capture the enemy’s capital without having your capital captured. Players have different units that they can move around in order to meet this goal.
Step-up:
•	Each player starts out with one capital city, six infantry, and two tanks
•	Players place all their pieces on their side of the map
Turn:
•	Players can move each unit once (excluding the capital)
•	If a unit collides with another unit the two units engage each other.
Scoring:
•	The game ends when one player moves a unit into the same tile as the opponent’s capital. Upon moving the piece the capital is destroyed and the player with their capital remaining is the winner.
•	Conflict between two units is calculated by the attacking unit dealing damage to the defending unit. If the defending unit is not destroyed it returns fire. Each unit attacks only once.

3. Reference for the game.
	Stratego / Game of the Generals

4. Camera
	Each player will be able to zoom in and out of the battle field (game board).

5. Modeling
	There will be different units in the game with very different shapes. Also the map itself will have different terrain tiles. These tiles will be made up of different textures (ie. Sand, water, grass).

6. Lighting and Shading
	Units, buildings, and certain terrain features will have shadows. The light source will be an overhead that will give the effect of the sun shining on the game board. Also each player can only see a certain distance from their units and the rest of the game board will appear shaded giving the impression of the fog of war.

7. Animation
 	Upon a player selecting an unit that unit will light up. The player than can select a terrain tile to move that unit to.

8. Interactivity
	Players will interact with the game board using the mouse to select units and move them.

# Reflection
I did not get as much done as I would of wanted, but I did learn a lot this semester. I would of liked to work a little more with the camera and put in some more function for the user. Somethings I would make to add would be to zoom in and out and rotate the camera. This might not make it into the game, but it would still be very good for testing and looking at objects. I learned a lot about creating shapes starting from basic points. These points were then used to construct more complex shapes. I would like to look into making a sphere object and making the objects look better. I did not get to cover lighting and shading, but the way my objects are set up if this is added it should look pretty good. I worked with Animation for the past few weeks and that was probably the coolest part of the whole project. I have done a lot of coding over the past years, but seeing something moving on screen always feel better than just get text output. I would like to keep working with the units and see if I can create a rotation animation. I was going to have the player use the mouse to interact with the units, but instead went with keyboard input. I actually like this more as now the second player can be a person and they can play on the same system. It would really interesting if I could expand this to be on two different computers, but that might be too complicated for the current stage of the game. I want to update the graphics a little more and add more functions to the game over the summer if possible. I think what I have currently is a great starting point and I would really like to see where I can take this.