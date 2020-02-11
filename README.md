# poolLeague.fitness

User Season:
	Fix Wins to first + Position 
	Fix TNSR for all time

Admin:
	Kick user from season (option to remove/maintain their games); update socket
	Delete user (and all their comments); update socket

Layout:
	Hide Excuse column when screen too small (Seasons and User Seasons)
	Mobile tabs solution
	User MostPlayed doesn't need to show the users name
	Colours for TNSR, wins to #1, etc (10 diff colours, colour users cell based on which % group they're in)

Features:
	Sort tables by headers
	Hovering a user should show their opponent count for that season
	Friendly league that never resets
	Option on All Time to include friendlies
	Filter recent games
	Scroll through old games (pagination or 'load more' button)
	Avatars
	Stars next to name for seasons won
	Add a “Real name” field to user - display this on their user page
	Request a game
	Gambling currency (Place a bet, next time that matchup happens check if bet won)( Odds are All-Time difference in TNSR between players)
	Emoji support
	Implement Elo
	New rule suggestions and votes (show who voted but not for what)
	Remove / Edit comment (that you added)
	Remove game (if both players involved agree)
	All time records pages for league and user
	Leave league button (doesn’t remove games, just the user from the league table)

Bugs:
	Comment autofocus and enter to submit - clear after submit
	TNSR - Player with 0 losses gets divided by 1 still - (divide by 1 only if losses+penalty = 0) (or divide by 0.5)
	Foul wins 

Calculation:
	If only one player has >1 unplayed, don't punish the others for that one game
	Max games vs one player - 10 seems reasonable?
	Wins to #1 and +1 aren't taking into account the extra wins discounting unplayed losses