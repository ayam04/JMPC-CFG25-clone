export const games = [
  // MATHEMATICS GAMES
  {
    id: 1,
    title: "Math Lightning Round",
    subject: "Mathematics", 
    grade: "Grade 6-8",
    duration: "15-20 mins",
    description: "Fast-paced math problem solving competition where teams race to answer questions displayed on screen.",
    howToPlay: [
      "Divide class into 3-4 teams",
      "Display math problems on screen with 30-second timer",
      "Teams write answers on mini whiteboards",
      "First team to show correct answer gets 3 points, second gets 1 point",
      "Problems get progressively harder for bonus points"
    ],
    materials: "Projector/screen, mini whiteboards, markers, timer, problem database",
    hasVideo: true,
    isCodeable: true
  },
  {
    id: 2,
    title: "Human Calculator Race",
    subject: "Mathematics", 
    grade: "Grade 6-8",
    duration: "15-20 mins",
    description: "Students form teams and solve math problems by standing in formation to represent numbers and operations.",
    howToPlay: [
      "Divide class into teams of 8-10",
      "Give each team math problems",
      "Team members hold number cards and arrange themselves to show the answer",
      "First team to form correct answer wins points"
    ],
    materials: "Number cards (0-9), operation symbols, problems written on board",
    hasVideo: true,
    isCodeable: false
  },
  {
    id: 3,
    title: "Fraction Pizza Party",
    subject: "Mathematics",
    grade: "Grade 6-7", 
    duration: "30-35 mins",
    description: "Students work with paper pizzas to understand fractions through hands-on cutting and sharing activities.",
    howToPlay: [
      "Give each group paper circles representing pizzas",
      "Call out fraction problems (e.g., 'Show me 3/4 of a pizza')",
      "Groups fold and cut their pizzas to show the fraction",
      "First group to show correctly gets a point"
    ],
    materials: "Paper circles, scissors, fraction problem cards",
    hasVideo: true,
    isCodeable: false
  },

  // SCIENCE GAMES
  {
    id: 4,
    title: "Science Fact or Fiction",
    subject: "Science",
    grade: "Grade 6-8", 
    duration: "20-25 mins",
    description: "Interactive true/false game where students vote on scientific statements and explain their reasoning.",
    howToPlay: [
      "Display scientific statements on screen",
      "Students vote true or false using hand signals",
      "Reveal correct answer with explanation",
      "Follow-up questions for deeper understanding",
      "Points awarded for correct answers and good explanations"
    ],
    materials: "Projector/screen, prepared statements database, scoring system",
    hasVideo: true,
    isCodeable: true
  },
  {
    id: 5,
    title: "Science Charades",
    subject: "Science",
    grade: "Grade 6-8", 
    duration: "20-25 mins",
    description: "Students act out scientific concepts, processes, or vocabulary words while their team guesses.",
    howToPlay: [
      "Prepare cards with science terms/concepts",
      "One student picks a card and acts it out silently", 
      "Their team has 2 minutes to guess correctly",
      "Teams take turns, points awarded for correct guesses"
    ],
    materials: "Pre-written cards with science vocabulary, timer, scoring sheet",
    hasVideo: false,
    isCodeable: false
  },
  {
    id: 6,
    title: "Ecosystem Web Game",
    subject: "Science",
    grade: "Grade 7-8",
    duration: "25-30 mins", 
    description: "Students use yarn to create a physical food web, demonstrating connections in an ecosystem.",
    howToPlay: [
      "Assign each student an organism from an ecosystem",
      "Student holds their organism card",
      "Use yarn to connect organisms that interact",
      "Discuss what happens when one organism is removed"
    ],
    materials: "Organism cards, balls of yarn, ecosystem diagrams",
    hasVideo: false,
    isCodeable: false
  },

  // ENGLISH GAMES
  {
    id: 7,
    title: "Word Detective Challenge",
    subject: "English",
    grade: "Grade 6-8",
    duration: "20-25 mins",
    description: "Progressive vocabulary game where students guess words from increasingly specific clues.",
    howToPlay: [
      "Display word clues on screen, starting vague and getting specific",
      "Teams can guess after each clue (5 clues total)",
      "Earlier correct guesses earn more points (5,4,3,2,1)",
      "Include definitions, synonyms, usage examples, and rhymes",
      "Bonus rounds with grammar challenges"
    ],
    materials: "Projector/screen, vocabulary database, clue system, answer sheets",
    hasVideo: true,
    isCodeable: true
  },
  {
    id: 8,
    title: "Grammar Relay",
    subject: "English",
    grade: "Grade 6-7",
    duration: "15-20 mins", 
    description: "Teams race to identify and correct grammar mistakes in sentences written on the board.",
    howToPlay: [
      "Write sentences with grammar errors on board",
      "Teams line up in relay formation",
      "First student runs to board, corrects one error, returns",
      "Next teammate continues until all errors are fixed"
    ],
    materials: "Whiteboard, markers, pre-written sentences with errors",
    hasVideo: false,
    isCodeable: false
  },
  {
    id: 9,
    title: "Vocabulary Pictionary",
    subject: "English",
    grade: "Grade 6-8",
    duration: "20-25 mins",
    description: "Students draw vocabulary words while their team tries to guess the word being illustrated.",
    howToPlay: [
      "Prepare cards with vocabulary words",
      "One student draws the word without using letters or numbers",
      "Team has 2 minutes to guess the word",
      "Rotate between teams, track points"
    ],
    materials: "Vocabulary word cards, whiteboard, markers, timer",
    hasVideo: false,
    isCodeable: false
  },

  // HISTORY GAMES
  {
    id: 10,
    title: "Timeline Challenge",
    subject: "History",
    grade: "Grade 6-8",
    duration: "25-30 mins",
    description: "Interactive chronological ordering game where students arrange historical events on a digital timeline.",
    howToPlay: [
      "Display historical events on screen without dates",
      "Teams discuss and submit their chronological order",
      "Reveal correct timeline with explanations",
      "Bonus points for explaining cause-and-effect relationships",
      "Progressive difficulty from ancient to modern times"
    ],
    materials: "Projector/screen, historical events database, digital timeline interface",
    hasVideo: true,
    isCodeable: true
  },
  {
    id: 11,
    title: "History Timeline Race",
    subject: "History",
    grade: "Grade 7-8",
    duration: "25-30 mins",
    description: "Students work in teams to arrange historical events in chronological order as quickly as possible.",
    howToPlay: [
      "Give each team cards with historical events and dates",
      "Teams must arrange events in correct chronological order",
      "First team to complete timeline correctly wins",
      "Discuss any disputed placements as a class"
    ],
    materials: "Event cards with dates, timeline templates, reference materials",
    hasVideo: false,
    isCodeable: false
  },
  {
    id: 12,
    title: "Historical Character Mystery",
    subject: "History",
    grade: "Grade 6-8",
    duration: "20-25 mins",
    description: "Students guess historical figures based on progressive clues about their life and achievements.",
    howToPlay: [
      "One student becomes a historical character",
      "Class asks yes/no questions to identify the person",
      "Limit to 20 questions per round",
      "Rotate characters from different time periods",
      "Discuss the person's historical significance after guessing"
    ],
    materials: "Historical character cards, question tracking sheet, reference materials",
    hasVideo: false,
    isCodeable: false
  },

  // GEOGRAPHY GAMES
  {
    id: 13,
    title: "Country Identifier Challenge",
    subject: "Geography", 
    grade: "Grade 6-8",
    duration: "20-25 mins",
    description: "Progressive clue-based game where students identify countries, capitals, and landmarks from visual and text hints.",
    howToPlay: [
      "Display 5 progressive clues about a location on screen",
      "Teams can guess after each clue (5,4,3,2,1 points for earlier guesses)",
      "Include flags, maps, cultural facts, and economic clues",
      "Multiple game modes: countries, capitals, landmarks, physical features",
      "Zoom in on world map to reveal location after each round"
    ],
    materials: "Projector/screen, geographic database, world map interface, flag collection",
    hasVideo: true,
    isCodeable: true
  },
  {
    id: 14,
    title: "Geography Bingo",
    subject: "Geography", 
    grade: "Grade 6-8",
    duration: "20-25 mins",
    description: "Students mark off countries, capitals, or geographical features on their bingo cards as they're called out.",
    howToPlay: [
      "Give each student a bingo card with geographical terms",
      "Call out clues about countries, capitals, or features",
      "Students mark corresponding squares on their cards",
      "First to get 5 in a row wins"
    ],
    materials: "Pre-made bingo cards, list of clues, markers or chips",
    hasVideo: false,
    isCodeable: false
  },
  {
    id: 15,
    title: "Human World Map",
    subject: "Geography",
    grade: "Grade 6-8",
    duration: "25-30 mins",
    description: "Students physically arrange themselves to represent continents, countries, or geographic features.",
    howToPlay: [
      "Assign each student a country or geographic feature",
      "Students position themselves to form a human world map",
      "Call out geographic relationships (neighbors, trade partners, etc.)",
      "Students must move to show connections",
      "Quiz on relative positions and geographic facts"
    ],
    materials: "Country/feature cards, large open space, world map reference",
    hasVideo: false,
    isCodeable: false
  }
];