List of TODOs for the Bithug app
(Mostly so Ruben can continue working on this tomorrow morning)
* Database-side:
- [ ] User model
- [ ] Model for stored Verified Datasnippet that was received previously.
- [ ] Model for Verification Tokens that Bithug gave to users, which importantly contains the Ethereum address at which it might be revoked later.
* Ethereum-facing side:
- [x] Class representing AuthenticationToken.
- [ ] Class representing Revocation Tokens.
- [x] Class representing To Be Determined Datasnippet.
- [x] Class representing List of To Be Verified Datasnippets that can be serialized for presenting to a user.
- [x] Class representing Verified Datasnippet. (note: nót the same as the DB-model, as we want to be able to use the Ethereum-facing software without a database; e.g. put it in a gem or even in a CLI)
- [ ] Class that can deserialize answer from user (to list of Verified Datasnippets) and check it against former List of To Be Verified Datasnippets to see if it matches or not.
* Controllers
- [x] Controller for simple actions:
 - [x] Login page
 - [ ] Dashboard page (needs some simple content + links to next two actions)
 - [ ] Logout action that redirects to login page after clearing session.
 - [ ] Verification download action.
* Styling
- [ ] Can be made a lot nicer. Needs to look like Github! (TODO by WM)
