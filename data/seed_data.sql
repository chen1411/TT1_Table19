INSERT INTO `destination` (`id`, `country_id`, `cost`, `name`, `notes`) VALUES
	(1, 1, 50, 'Marina Bay Sands', 'Iconic hotel with an infinity pool and stunning views of the city skyline. Open 24/7.'),
	(2, 1, 30, 'Gardens by the Bay', 'Futuristic park featuring Supertree Grove and Flower Dome conservatories. Open daily from 9 AM to 9 PM.'),
	(3, 1, 40, 'Sentosa Island', 'Fun-filled island resort with beaches, theme parks, and various attractions. Open daily from 10 AM to 7 PM.'),
	(4, 1, 60, 'Universal Studios Singapore', 'Amusement park with movie-themed rides and entertainment. Open daily from 10 AM to 7 PM.'),
	(5, 1, 35, 'Singapore Zoo', 'Award-winning zoo showcasing diverse wildlife species. Open daily from 8:30 AM to 6 PM.');

INSERT INTO `country` (`id`, `name`) VALUES
	(1, 'Singapore');

INSERT INTO `itinerary` (`id`, `country_id`, `user_id`, `budget`, `title`) VALUES
	(1, 1, 1, 500, 'Sightseeing in Singapore'),
	(2, 1, 1, 800, 'Singapore Adventure'),
	(3, 1, 2, 600, 'Exploring Singapore');

INSERT INTO `itinerary_destination` (`id`, `destination_id`, `itinerary_id`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 3, 1),
	(4, 4, 2),
	(5, 5, 2),
	(6, 2, 3);
