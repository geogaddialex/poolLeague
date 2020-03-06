# poolLeague.fitness

Priority:
	Mobile table hides TNSR
	7 ball should be its own counter, so 2 then 2*0.8 then 2*0.8*0.8
	Can log in with only part of the username (e.g. Al or ex) cant sign up with those either
	Table - farm factor (gap between most and least played) / median farm
	RTN - TNSR doesn't update unless you select winner+loser (doesn't know how many points you'd get) - add green tick
	New rule suggestions and votes (show who voted but not for what)(needs notifications)
	Friendly league that never resets - Option on All Time to include friendlies
	Request a game
	Sort tables by headers

Admin:
	Kick user from season (option to remove/maintain their games); update socket
	Delete user (and all their comments); update socket
	
Layout:
	Mobile tabs solution (Season 5 will cause overflow)
	Colours for TNSR, wins to #1, etc (10 diff colours, colour users cell based on which % group they're in)
		divide difference between 1st and last by 10, assign colours by grouping

Features:
	Edit a season
	Player comparison
	Global league chat
	Hovering over penalty should show the breakdown
	Filter recent games
	Avatars
	Add a “Real name” field to user - display this on their user page
	Gambling currency (Place a bet, next time that matchup happens check if bet won)( Odds are All-Time difference in TNSR between players)
	Emoji support
	Implement Elo
	Remove game (if both players involved agree)
	Comment length should show characters eg (10/150)

Calculation:
	If only one player has >1 unplayed, don't punish the others for that one game
	Wins to #1 and +1 aren't taking into account that each extra win cancels out an underMin loss

QOL:
	Green circle shows online status
	"Load more" jumps to bottom, doesn't display when there's no more, shows (displayed/total)
	Comment autofocus and clear after submit
	Min games for unstarted season shouldn't display
	Hall of shame: See who seven balled who
	User MostPlayed doesn't need to show the users name
	Remove / Edit comment (that you added, or admin can remove)
	All time page shows best TNSR record (closed seasons only)
	User page default tab should be current season

Refactor:
	dp shouldn't multiply by 10, that's the job of calculateTNSR


http://www.epa.org.uk/images/rules/World%20Rules%202015.pdf
- You can play any direction from the baulk (E2c)
- Foul break if four object balls don’t touch the cushion (or a ball is potted) (re rack and 2 shots) (F4)
- Potting white on a fair break, only one shot to the opponent (F4ci)
- If you don’t pot, it’s a foul if nothing hits a cushion (G1b)
    - unless snookered (G3ab)
    - If object ball is already touching cushion it doesn’t count (G4a)
- If you pot on an open table (one/both colours on break or both otherwise) you must choose a colour (otherwise foul), if you choose a colour you didn’t pot you only get it if you pot (H2, H3)
- Sixty seconds to take a shot (I1) (not really feasible with office distractions)
- After with two shots you have to nominate a ball if you want to hit one other than your own (K17)
- Push shots aren’t really a thing in pool unless it’s blatantly a slow push or double hit (N1)
- If you’re fouled into a snooker you can move the ball to the baulk (P3b)
- If a ball falls into a pocket untouched it should be replaced as if it hadn’t (T1)
