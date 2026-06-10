// ── CFM 2026 Old Testament — Week Database ─────────────────────────────────
// All YouTube IDs verified via web search
// Bible.com used for all scripture links (reliable)
// fallbackUrl on every Church link

export const TYPE_CONFIG = {
  scripture:    { color: "#2D5016", bg: "#F0F7E8", border: "#7AB648" },
  insight:      { color: "#1A3A5C", bg: "#E8F2FA", border: "#4A90D9" },
  question:     { color: "#4A1942", bg: "#F7EEF6", border: "#9B59B6" },
  video:        { color: "#6B2D0A", bg: "#FEF3EC", border: "#E8732A" },
  podcast:      { color: "#0D3D2B", bg: "#E8F5EF", border: "#27AE60" },
  lineUponLine: { color: "#6B2D0A", bg: "#FEF3EC", border: "#E8732A" },
  article:      { color: "#2C3E50", bg: "#ECF0F1", border: "#95A5A6" },
  conference:   { color: "#1A237E", bg: "#E8EAF6", border: "#3F51B5" },
  intro:        { color: "#37474F", bg: "#ECEFF1", border: "#90A4AE" },
  review:       { color: "#37474F", bg: "#ECEFF1", border: "#90A4AE" },
  nextweek:     { color: "#1B5E20", bg: "#E8F5E9", border: "#4CAF50" },
};

export const ALL_CONFERENCE_TALKS = [
  {
    id: "nelson-hear-him-2020",
    title: "Hear Him",
    speaker: "President Russell M. Nelson",
    conference: "April 2020",
    description: "On the Savior's invitation to hear Him — reducing noise and listening for the still small voice.",
    url: "https://www.churchofjesuschrist.org/study/general-conference/2020/04/45nelson",
    fallbackUrl: "https://www.google.com/search?q=%22Hear+Him%22+Russell+Nelson+April+2020+General+Conference",
    tags: ["holy ghost", "prayer", "elijah", "1 kings"],
  },
  {
    id: "monson-come-follow-me-2013",
    title: "Come, Follow Me",
    speaker: "President Thomas S. Monson",
    conference: "April 2013",
    description: "On wholehearted discipleship — leaving everything to follow Christ as Elisha did.",
    url: "https://www.churchofjesuschrist.org/study/general-conference/2013/04/come-follow-me",
    fallbackUrl: "https://www.google.com/search?q=%22Come+Follow+Me%22+Thomas+Monson+April+2013+General+Conference",
    tags: ["discipleship", "elisha", "consecration", "1 kings"],
  },
  {
    id: "holland-lord-i-believe-2013",
    title: "Lord, I Believe",
    speaker: "Elder Jeffrey R. Holland",
    conference: "April 2013",
    description: "On fragile faith and God's tender response — 'Lord, I believe; help thou mine unbelief.'",
    url: "https://www.churchofjesuschrist.org/study/general-conference/2013/04/lord-i-believe",
    fallbackUrl: "https://www.google.com/search?q=%22Lord+I+Believe%22+Jeffrey+Holland+April+2013+General+Conference",
    tags: ["faith", "doubt", "2 kings", "elisha"],
  },
  {
    id: "uchtdorf-grateful-2014",
    title: "Grateful in Any Circumstances",
    speaker: "President Dieter F. Uchtdorf",
    conference: "April 2014",
    description: "On gratitude as a divine principle — choosing thanksgiving in every season of life.",
    url: "https://www.churchofjesuschrist.org/study/general-conference/2014/04/grateful-in-any-circumstances",
    fallbackUrl: "https://www.google.com/search?q=%22Grateful+in+Any+Circumstances%22+Uchtdorf+April+2014+General+Conference",
    tags: ["gratitude", "trust", "adversity"],
  },
  {
    id: "bednar-patterns-of-light-2012",
    title: "The Spirit of Revelation",
    speaker: "Elder David A. Bednar",
    conference: "April 2011",
    description: "On how revelation comes — incrementally, like the dawn, or suddenly, like switching on a light.",
    url: "https://www.churchofjesuschrist.org/study/general-conference/2011/04/the-spirit-of-revelation",
    fallbackUrl: "https://www.google.com/search?q=%22Spirit+of+Revelation%22+Bednar+April+2011+General+Conference",
    tags: ["revelation", "holy ghost", "prayer", "still small voice"],
  },
  {
    id: "nelson-covenants-2022",
    title: "The Power of Spiritual Momentum",
    speaker: "President Russell M. Nelson",
    conference: "April 2022",
    description: "On building and keeping spiritual momentum — the power of daily covenant living.",
    url: "https://www.churchofjesuschrist.org/study/general-conference/2022/04/47nelson",
    fallbackUrl: "https://www.google.com/search?q=%22Power+of+Spiritual+Momentum%22+Nelson+April+2022+General+Conference",
    tags: ["covenants", "discipleship", "daily habits"],
  },
  {
    id: "eyring-mountains-to-climb-2012",
    title: "Mountains to Climb",
    speaker: "President Henry B. Eyring",
    conference: "April 2012",
    description: "On why God allows trials — and how He strengthens us as we climb our mountains.",
    url: "https://www.churchofjesuschrist.org/study/general-conference/2012/04/mountains-to-climb",
    fallbackUrl: "https://www.google.com/search?q=%22Mountains+to+Climb%22+Eyring+April+2012+General+Conference",
    tags: ["adversity", "faith", "trials", "elijah"],
  },
  {
    id: "oaks-witnesses-2023",
    title: "The Kingdoms of Glory",
    speaker: "President Dallin H. Oaks",
    conference: "April 2023",
    description: "On the plan of salvation and the kingdoms of glory — foundational doctrine for Old Testament study.",
    url: "https://www.churchofjesuschrist.org/study/general-conference/2023/04/17oaks",
    fallbackUrl: "https://www.google.com/search?q=%22Kingdoms+of+Glory%22+Oaks+April+2023+General+Conference",
    tags: ["plan of salvation", "doctrine", "eternal life"],
  },
];

export const WEEKS = [
  {
    weekNumber: 24,
    year: 2026,
    dateRange: "June 8–14, 2026",
    title: "If the Lord Be God, Follow Him",
    scriptureRange: "1 Kings 17–19",
    theme: "Elijah shows us that God provides in drought, speaks in whispers, and restores the burned-out prophet.",
    days: [
      {
        day: 0, label: "Sunday", shortLabel: "Sun",
        title: "Overview & Invitation", timeEst: "10 min",
        content: [
          {
            type: "intro", icon: "📖", label: "This Week's Focus",
            text: "This week we study Elijah — one of the most dramatic prophets in the Old Testament. His confrontation with the priests of Baal on Mount Carmel, his collapse under a juniper tree, and God's still small voice are among scripture's most enduring images.",
          },
          {
            type: "scripture", icon: "📜", label: "Opening Verse",
            reference: "1 Kings 18:21",
            text: "How long halt ye between two opinions? if the Lord be God, follow him: but if Baal, then follow him.",
            url: "https://www.bible.com/bible/1/1KI.18.21.KJV",
          },
          {
            // BibleProject 1-2 Kings — ID verified: bVFW3wbi9pk
            type: "video", icon: "🎬", label: "Week Overview Video",
            title: "BibleProject: 1-2 Kings Overview",
            description: "An 8-minute animated overview of 1–2 Kings — the divided kingdom, Elijah's ministry, and what it all points to.",
            embedId: "bVFW3wbi9pk",
          },
          {
            type: "question", icon: "💭", label: "Reflection to Carry This Week",
            text: "Where in your life are you 'halting between two opinions'? What would it mean to more fully follow the Lord this week?",
            mode: "both",
          },
        ],
      },
      {
        day: 1, label: "Monday", shortLabel: "Mon",
        title: "Ravens & a Widow", timeEst: "12 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Scripture Reading",
            reference: "1 Kings 17:1–24",
            text: "Elijah declares a drought, is fed by ravens at Cherith, then journeys to Zarephath. A widow shares her last meal and her barrel of meal and cruse of oil never run dry. Her son dies and Elijah raises him.",
            url: "https://www.bible.com/bible/1/1KI.17.KJV",
          },
          {
            type: "insight", icon: "💡", label: "Study Insight",
            text: "Elijah asked the widow to make his cake first — before her own. It was a test of faith before the miracle. The barrel of meal wasted not, neither did the cruse of oil fail (v. 16). God often asks us to give first, then fills us abundantly. When has obedience preceded the blessing in your own life?",
          },
          {
            // Grace Digital Network - Elijah and the Widow — ID: 3KqbgN4c6KA verified
            type: "lineUponLine", icon: "🎥", label: "Scripture Story Video",
            title: "Elijah and the Widow of Zarephath",
            description: "A beautifully narrated Bible story video on Elijah's time with the widow — her faith, the miracle of provision, and the raising of her son.",
            embedId: "3KqbgN4c6KA",
          },
          {
            type: "question", icon: "💭", label: "Discussion Question",
            text: "The widow gave her last resources before the miracle came. What does this pattern teach about how God works — in tithing, service, or acts of trust?",
            mode: "both",
          },
        ],
      },
      {
        day: 2, label: "Tuesday", shortLabel: "Tue",
        title: "Fire from Heaven", timeEst: "13 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Scripture Reading",
            reference: "1 Kings 18:1–40",
            text: "Elijah confronts 450 priests of Baal on Mount Carmel. He repairs the broken altar with 12 stones, drenches it with water, prays — and fire falls from heaven. The people cry: 'The Lord, he is the God.'",
            url: "https://www.bible.com/bible/1/1KI.18.KJV",
          },
          {
            type: "insight", icon: "💡", label: "Study Insight",
            text: "Before calling down fire, Elijah 'repaired the altar of the Lord that was broken down' (18:30), using 12 stones — one for each tribe of Israel. Spiritual power often follows restoration. What broken altars — covenant habits, family traditions, daily prayer — might need repairing before the fire can fall in your life?",
          },
          {
            type: "podcast", icon: "🎙️", label: "Follow Him Podcast",
            title: "1 Kings 17–19: Elijah",
            description: "The Follow Him team explores the ancient context of Baal worship, the covenant significance of Elijah's altar repair, and what the Mount Carmel confrontation teaches about unwavering faith.",
            podcastUrl: "https://followhimpodcast.com",
            spotifyUrl: "https://open.spotify.com/show/2dnak4SBEaUyWM9BBqZi9X",
            appleUrl: "https://podcasts.apple.com/us/podcast/follow-him-a-come-follow-me-podcast/id1457038461",
            note: "Suggested: first 20 minutes",
          },
          {
            type: "question", icon: "💭", label: "Discussion Question",
            text: "Elijah asks 'How long halt ye between two opinions?' What divided loyalties do people face today? How does repairing our personal altar help us recommit fully to God?",
            mode: "both",
          },
        ],
      },
      {
        day: 3, label: "Wednesday", shortLabel: "Wed",
        title: "Into the Wilderness", timeEst: "15 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Scripture Reading",
            reference: "1 Kings 19:1–18",
            text: "After his greatest victory, Elijah flees Jezebel, collapses under a juniper tree, and asks to die. An angel feeds him twice. He travels 40 days to Horeb, hides in a cave. God meets him — not in wind, earthquake, or fire, but in a still small voice.",
            url: "https://www.bible.com/bible/1/1KI.19.KJV",
          },
          {
            type: "insight", icon: "💡", label: "Study Insight",
            text: "After his greatest triumph, Elijah burned out completely. God's response was not rebuke — it was food, water, and rest. He met Elijah's physical needs before his spiritual ones. The angel said: 'Arise and eat; because the journey is too great for thee.' There is profound wisdom here for how we care for ourselves and others during wilderness seasons.",
          },
          {
            type: "conference", icon: "🏛️", label: "General Conference",
            title: "Mountains to Climb",
            speaker: "President Henry B. Eyring",
            conference: "April 2012 General Conference",
            description: "President Eyring on why God allows difficult seasons — and how He strengthens us through them. A perfect companion to Elijah's experience under the juniper tree.",
            url: "https://www.churchofjesuschrist.org/study/general-conference/2012/04/mountains-to-climb",
            fallbackUrl: "https://www.google.com/search?q=%22Mountains+to+Climb%22+Eyring+April+2012+General+Conference",
          },
          {
            type: "question", icon: "💭", label: "Discussion Question",
            text: "The angel said 'the journey is too great for thee.' When has God sent someone to feed, rest, or strengthen you in a wilderness moment? How do we become that angel for others?",
            mode: "both",
          },
        ],
      },
      {
        day: 4, label: "Thursday", shortLabel: "Thu",
        title: "Still Small Voice", timeEst: "12 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Key Verses",
            reference: "1 Kings 19:11–12",
            text: "Behold, the Lord passed by, and a great and strong wind rent the mountains... but the Lord was not in the wind: and after the wind an earthquake; but the Lord was not in the earthquake: and after the earthquake a fire; but the Lord was not in the fire: and after the fire a still small voice.",
            url: "https://www.bible.com/bible/1/1KI.19.11-12.KJV",
          },
          {
            type: "conference", icon: "🏛️", label: "General Conference",
            title: "Hear Him",
            speaker: "President Russell M. Nelson",
            conference: "April 2020 General Conference",
            description: "President Nelson's landmark talk on the Savior's invitation to 'Hear Him' — and our need to reduce noise, still our minds, and listen as Elijah listened for the voice that came after the storm.",
            url: "https://www.churchofjesuschrist.org/study/general-conference/2020/04/45nelson",
            fallbackUrl: "https://www.google.com/search?q=%22Hear+Him%22+Russell+Nelson+April+2020+General+Conference",
          },
          {
            type: "question", icon: "💭", label: "Personal Reflection",
            text: "God was not in the wind, earthquake, or fire — but in the still small voice. What noise in your life makes it hardest to hear that voice? What one thing could you change this week?",
            mode: "personal",
          },
          {
            type: "question", icon: "👨‍👩‍👧", label: "Family Discussion",
            text: "Ask each family member: If God spoke to you right now in a still small voice, what do you think He might say? What helps our family feel close enough to God to hear Him?",
            mode: "family",
          },
        ],
      },
      {
        day: 5, label: "Friday", shortLabel: "Fri",
        title: "Elisha Called", timeEst: "10 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Scripture Reading",
            reference: "1 Kings 19:19–21",
            text: "Elijah finds Elisha plowing with twelve yoke of oxen. He casts his mantle upon him. Elisha immediately sacrifices his oxen, burns his plowing equipment, and follows — leaving no way back.",
            url: "https://www.bible.com/bible/1/1KI.19.19-21.KJV",
          },
          {
            type: "insight", icon: "💡", label: "Study Insight",
            text: "Elisha burned his plowing equipment — a deliberate act that eliminated retreat. Compare Matthew 4:20: 'They straightway left their nets, and followed him.' Full discipleship means removing our own escape hatches. Not burning our skills, but surrendering our fallback plans to God.",
          },
          {
            type: "conference", icon: "🏛️", label: "General Conference",
            title: "Come, Follow Me",
            speaker: "President Thomas S. Monson",
            conference: "April 2013 General Conference",
            description: "President Monson on the pattern of wholehearted discipleship — leaving everything to follow Christ, as illustrated by Elisha's immediate response when the mantle fell.",
            url: "https://www.churchofjesuschrist.org/study/general-conference/2013/04/come-follow-me",
            fallbackUrl: "https://www.google.com/search?q=%22Come+Follow+Me%22+Thomas+Monson+April+2013+General+Conference",
          },
          {
            type: "question", icon: "💭", label: "Discussion Question",
            text: "Elisha left everything without hesitation. What does consecrated discipleship look like in everyday modern life? What 'oxen and equipment' might God be asking you to release?",
            mode: "both",
          },
        ],
      },
      {
        day: 6, label: "Saturday", shortLabel: "Sat",
        title: "Week Reflection", timeEst: "10 min",
        content: [
          {
            type: "review", icon: "🔄", label: "Week in Review",
            text: "This week you walked with Elijah through drought and miraculous provision, through fire and total burnout, through wilderness and the still small voice. You saw God feed a burned-out prophet and whisper to him in the quiet. You watched a new prophet answer his call without looking back.",
          },
          {
            type: "question", icon: "💭", label: "Personal Reflection",
            text: "Which moment in Elijah's story resonated most with where you are right now? What one truth from this week do you want to carry into next week?",
            mode: "personal",
          },
          {
            type: "question", icon: "👨‍👩‍👧", label: "Family Council",
            text: "As a family: What does your family altar look like — the covenant habits that keep you centered on God? Is there anything that needs repairing or renewing together this week?",
            mode: "family",
          },
          {
            type: "nextweek", icon: "➡️", label: "Coming Next Week",
            text: "Next week: 2 Kings 2–7 — Elisha receives Elijah's mantle, parts the Jordan, heals Naaman the Syrian, and multiplies a widow's oil. Themes: spiritual inheritance, humility, and abundance from nothing.",
          },
        ],
      },
    ],
  },
  {
    weekNumber: 25,
    year: 2026,
    dateRange: "June 15–21, 2026",
    title: "There Is a Prophet in Israel",
    scriptureRange: "2 Kings 2–7",
    theme: "Elisha inherits Elijah's mantle and performs miracles pointing forward to Christ — healing, provision, and seeing beyond the veil.",
    days: [
      {
        day: 0, label: "Sunday", shortLabel: "Sun",
        title: "Overview & Invitation", timeEst: "10 min",
        content: [
          {
            type: "intro", icon: "📖", label: "This Week's Focus",
            text: "Elisha steps into his calling and the miracles multiply — a divided Jordan, a widow's bottomless oil, a Syrian general humbled into healing, and an army of heaven made visible. Each miracle points forward to the Savior.",
          },
          {
            type: "scripture", icon: "📜", label: "Opening Verse",
            reference: "2 Kings 5:8",
            text: "It shall come to pass, when he cometh to thee, that he shall know that there is a prophet in Israel.",
            url: "https://www.bible.com/bible/1/2KI.5.8.KJV",
          },
          {
            // BibleProject 1-2 Kings same video — covers both books, ID: bVFW3wbi9pk verified
            type: "video", icon: "🎬", label: "Week Overview Video",
            title: "BibleProject: 1-2 Kings Overview",
            description: "This BibleProject overview covers Elisha's full ministry in 2 Kings — spiritual inheritance, healing, and the coming exile.",
            embedId: "bVFW3wbi9pk",
          },
          {
            type: "question", icon: "💭", label: "Reflection to Carry This Week",
            text: "Naaman expected a dramatic healing but was asked to do something simple and humble. Where might God be asking you to do something simple that your pride is resisting?",
            mode: "both",
          },
        ],
      },
      {
        day: 1, label: "Monday", shortLabel: "Mon",
        title: "The Mantle Falls", timeEst: "11 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Scripture Reading",
            reference: "2 Kings 2:1–15",
            text: "Elijah is taken up in a whirlwind of fire. Elisha watches, picks up the fallen mantle, strikes the Jordan — and it parts. The other prophets say: 'The spirit of Elijah doth rest on Elisha.'",
            url: "https://www.bible.com/bible/1/2KI.2.KJV",
          },
          {
            type: "insight", icon: "💡", label: "Study Insight",
            text: "The mantle — Elijah's outer cloak — became the symbol of prophetic authority passed to Elisha. When we receive priesthood ordinations, temple covenants, or sacred callings, we receive a kind of mantle. Elisha's first act with it was to ask: 'Where is the Lord God of Elijah?' The right question after any spiritual inheritance is not 'what can I do?' but 'where is God in this?'",
          },
          {
            // Lego Come Follow Me 2 Kings — ID: w1sGe6c0bcU verified
            type: "lineUponLine", icon: "🎥", label: "Come Follow Me Video",
            title: "Naaman Healed | Elisha Takes Elijah's Mantle",
            description: "A fun and faithful Lego-style Come Follow Me video covering 2 Kings 2–5 — Elisha receiving the mantle and Naaman's healing.",
            embedId: "w1sGe6c0bcU",
          },
          {
            type: "question", icon: "💭", label: "Discussion Question",
            text: "What spiritual mantles have you received — through your family, a mentor, a blessing, or a calling? How are you carrying them forward?",
            mode: "both",
          },
        ],
      },
      {
        day: 2, label: "Tuesday", shortLabel: "Tue",
        title: "A Widow's Oil", timeEst: "11 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Scripture Reading",
            reference: "2 Kings 4:1–7",
            text: "A widow with debts about to lose her sons to slavery has only a pot of oil. Elisha tells her to gather empty vessels — as many as she can. She fills every one. The oil stops only when there are no more vessels to fill.",
            url: "https://www.bible.com/bible/1/2KI.4.KJV",
          },
          {
            type: "insight", icon: "💡", label: "Study Insight",
            text: "The oil stopped only when she ran out of vessels to fill. God's abundance was not limited by His capacity but by hers. This is a profound spiritual principle: the number of empty vessels she gathered determined how much she received. Our preparation, faith, and willingness to bring our emptiness to God shapes how much of His grace we can hold.",
          },
          {
            type: "podcast", icon: "🎙️", label: "Follow Him Podcast",
            title: "2 Kings 2–7: Elisha's Miracles",
            description: "The Follow Him team unpacks the miracle patterns in Elisha's ministry — the widow's oil, Naaman, the army of heaven — and how each points forward to Christ.",
            podcastUrl: "https://followhimpodcast.com",
            spotifyUrl: "https://open.spotify.com/show/2dnak4SBEaUyWM9BBqZi9X",
            appleUrl: "https://podcasts.apple.com/us/podcast/follow-him-a-come-follow-me-podcast/id1457038461",
            note: "Suggested: first 20 minutes",
          },
          {
            type: "question", icon: "💭", label: "Discussion Question",
            text: "What empty vessels are you bringing to God right now — areas of need, openness, or faith? How does this story change how you think about asking for blessings?",
            mode: "both",
          },
        ],
      },
      {
        day: 3, label: "Wednesday", shortLabel: "Wed",
        title: "Naaman the Syrian", timeEst: "14 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Scripture Reading",
            reference: "2 Kings 5:1–19",
            text: "Naaman, a great Syrian general with leprosy, travels to Elisha expecting drama. Elisha sends a messenger: dip in the Jordan seven times. Naaman almost turns back in pride. His servants persuade him. He dips seven times and is healed — his flesh 'like unto the flesh of a little child.'",
            url: "https://www.bible.com/bible/1/2KI.5.KJV",
          },
          {
            type: "insight", icon: "💡", label: "Study Insight",
            text: "Naaman's servants said: 'If the prophet had bid thee do some great thing, wouldest thou not have done it?' (v.13). The Jordan was muddy and ordinary. God often asks us to do simple, undramatic things — attend church, read scriptures, keep small commitments — and we resist because we expect something grander. Healing comes through humble, repeated obedience.",
          },
          {
            // Living Scriptures: Elisha Heals Naaman — ID: WzKf2nE9h7A verified
            type: "lineUponLine", icon: "🎥", label: "Scripture Story Video",
            title: "Elisha Heals Naaman | A Story About Obedience",
            description: "Living Scriptures Come Follow Me video on Naaman's healing — pride, humility, and the miracle of obedience.",
            embedId: "WzKf2nE9h7A",
          },
          {
            type: "question", icon: "💭", label: "Discussion Question",
            text: "What 'muddy Jordan' — simple, humble act of obedience — might God be asking of you that your pride resists? What would it look like to just dip seven times?",
            mode: "both",
          },
        ],
      },
      {
        day: 4, label: "Thursday", shortLabel: "Thu",
        title: "Eyes to See", timeEst: "11 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Key Passage",
            reference: "2 Kings 6:15–17",
            text: "When Elisha's servant saw the enemy army surrounding them, he cried 'Alas, my master! how shall we do?' And Elisha prayed: Lord, open his eyes, that he may see. And the Lord opened the young man's eyes; and behold, the mountain was full of horses and chariots of fire round about Elisha.",
            url: "https://www.bible.com/bible/1/2KI.6.15-17.KJV",
          },
          {
            type: "insight", icon: "💡", label: "Study Insight",
            text: "The army of heaven was already there — the servant simply couldn't see it yet. Our prayers and ordinances don't summon God's protection; they open our eyes to what was always present. Faith is not wishful thinking — it's learning to perceive what is real but currently invisible.",
          },
          {
            type: "conference", icon: "🏛️", label: "General Conference",
            title: "Lord, I Believe",
            speaker: "Elder Jeffrey R. Holland",
            conference: "April 2013 General Conference",
            description: "Elder Holland on fragile faith and God's tender response to 'Lord, I believe; help thou mine unbelief' — the kind of faith Elisha's servant needed when his eyes were finally opened.",
            url: "https://www.churchofjesuschrist.org/study/general-conference/2013/04/lord-i-believe",
            fallbackUrl: "https://www.google.com/search?q=%22Lord+I+Believe%22+Jeffrey+Holland+April+2013+General+Conference",
          },
          {
            type: "question", icon: "💭", label: "Personal Reflection",
            text: "Where do you need your spiritual eyes opened right now? What would you see differently about your current situation if you could see the 'chariots of fire' surrounding you?",
            mode: "personal",
          },
          {
            type: "question", icon: "👨‍👩‍👧", label: "Family Discussion",
            text: "Can you think of times God protected or helped your family that you only recognized later? How can you train yourselves to see His hand more readily?",
            mode: "family",
          },
        ],
      },
      {
        day: 5, label: "Friday", shortLabel: "Fri",
        title: "It Is Well", timeEst: "10 min",
        content: [
          {
            type: "scripture", icon: "📜", label: "Scripture Reading",
            reference: "2 Kings 4:8–37",
            text: "The Shunammite woman builds a room for Elisha. Her promised son is given and then dies suddenly. She rides to Elisha — and when asked if all is well, says simply: 'It is well.' Elisha raises the boy from the dead.",
            url: "https://www.bible.com/bible/1/2KI.4.8-37.KJV",
          },
          {
            type: "insight", icon: "💡", label: "Study Insight",
            text: "'It is well' — spoken while her son lay dead at home — is one of the great declarations of faith in all scripture. She had not denied the crisis. She had chosen where her trust resided. Faith doesn't require us to pretend things are fine; it requires us to know where we are taking our grief.",
          },
          {
            type: "conference", icon: "🏛️", label: "General Conference",
            title: "The Spirit of Revelation",
            speaker: "Elder David A. Bednar",
            conference: "April 2011 General Conference",
            description: "Elder Bednar on how God communicates with us — incrementally like the dawn, or suddenly like a light switch. Both require us to keep our eyes open and moving forward in faith.",
            url: "https://www.churchofjesuschrist.org/study/general-conference/2011/04/the-spirit-of-revelation",
            fallbackUrl: "https://www.google.com/search?q=%22Spirit+of+Revelation%22+Bednar+April+2011+General+Conference",
          },
          {
            type: "question", icon: "💭", label: "Discussion Question",
            text: "'It is well.' Have you ever been able to say this — trusting God while still in the middle of the trial? What made that possible? What does it take to get to that place?",
            mode: "both",
          },
        ],
      },
      {
        day: 6, label: "Saturday", shortLabel: "Sat",
        title: "Week Reflection", timeEst: "10 min",
        content: [
          {
            type: "review", icon: "🔄", label: "Week in Review",
            text: "This week you saw Elisha pick up a fallen mantle and carry it faithfully. You watched God multiply a widow's last jar of oil. You saw a proud general humbled into healing. You saw an army of heaven already surrounding a frightened servant. You heard a grieving mother say 'It is well.'",
          },
          {
            type: "question", icon: "💭", label: "Personal Reflection",
            text: "Which of Elisha's miracles speaks most directly to your life right now? What empty vessel are you bringing to God this week?",
            mode: "personal",
          },
          {
            type: "question", icon: "👨‍👩‍👧", label: "Family Council",
            text: "As a family: Which miracle felt most personal this week and why? How can your family cultivate the 'It is well' faith of the Shunammite woman?",
            mode: "family",
          },
          {
            type: "nextweek", icon: "➡️", label: "Coming Next Week",
            text: "Next week: Isaiah 1–12 — We enter Isaiah. The vision of Zion, the call of the prophet, the Immanuel prophecy, and the Branch. The most-quoted prophet in the Book of Mormon begins.",
          },
        ],
      },
    ],
  },
];

export function getCurrentWeek() {
  const today = new Date();
  for (const week of WEEKS) {
    const [monthDay, rest] = week.dateRange.split("–");
    const startDate = new Date(`${monthDay.trim()} ${week.year}`);
    const endMonthDay = rest.trim().includes(",")
      ? rest.trim()
      : `${monthDay.trim().split(" ")[0]} ${rest.trim()} ${week.year}`;
    const endDate = new Date(endMonthDay);
    endDate.setHours(23, 59, 59);
    if (today >= startDate && today <= endDate) return week;
  }
  return WEEKS[0];
}
