# poolLeague.fitness

Priority:
	Delete user (and all their comments); update socket
	Anti-farming mechanism
	Scroll through old games (pagination or 'load more' button)
	New rule suggestions and votes (show who voted but not for what)
	Remove / Edit comment (that you added)
	All time page shows best TNSR record (closed seasons only)
	Comment autofocus and clear after submit
	TNSR - Player with 0 losses gets divided by 1 still - (divide by 1 only if losses+penalty = 0) (or divide by 0.5)

Admin:
	Kick user from season (option to remove/maintain their games); update socket
	
Layout:
	Mobile tabs solution (Season 5 will cause overflow)
	User MostPlayed doesn't need to show the users name
	Colours for TNSR, wins to #1, etc (10 diff colours, colour users cell based on which % group they're in)

Features:
	Global league chat
	Sort tables by headers
	Hovering a user should show their opponent count for that season
	Friendly league that never resets
	Option on All Time to include friendlies
	Filter recent games
	Avatars
	Add a “Real name” field to user - display this on their user page
	Request a game
	Gambling currency (Place a bet, next time that matchup happens check if bet won)( Odds are All-Time difference in TNSR between players)
	Emoji support
	Implement Elo
	Remove game (if both players involved agree)

Calculation:
	If only one player has >1 unplayed, don't punish the others for that one game
	Wins to #1 and +1 aren't taking into account that each extra win cancels out an underMin loss