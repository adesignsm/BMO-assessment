Technical Questions and Answers

Q1. How long did you spend on the coding assignment?
A1: In total I spent almost 8 hours within two days.
    There are a couple thing I would add to my solution:
    - Code Splitting to improve performance even if it is by a little bit (performance)
    - Find a better solution than using preconncet as a resource hint (performance)
    - Add a caching policy to drastically improve performance
    - Error handling (performance)
    - I had used batching to switch between datasets but I wanted to come up with a better solution
    - Add more components to the page
    - Clear indication of results loading, results not available, and search does not exist (UX)
    - Add event listeneres to each book so users may click on a book, redirect to google, and show the user 
      results that allow the them to purcahse that book online (UX)

Q2. What was the most useful feature that was added to the latest version of your chosen language? 
A2: A new feature that had been introudced in react 18 is called batching. It allows parts of the application to "batch" together state updates and then rerender them all at once. I used this in the book tool when switching between the types of data being displayed(raw book data, alphabetically ordered data, data ordered by publish year).

    Here is a snippet:

        //Data filter click events
    const DataFilterClick = () => {
        setShowAlphabeticalData(true);
        setShowRawData(false); 
        setShowPublishYearData(false);
    };

    const PublishYearFilterClick = () => {
        setShowPublishYearData(true); 
        setShowRawData(false)
        setShowAlphabeticalData(false);
    };

    these batches are only triggered once their respective buttons are clicked.

Q3. How would you track down a performance issue in production? Have you ever had to do this?
A3: What was stated in this assessment was to use lighthouse audit to track SEO, accessibility, and performance. Normally I would use lighthouse audit to track a variety of issues as it is very user friendly and robust. However there is another method that I have used in the past, similarily in the developer console you can access the "Network" tab and use the filter input to check for anomolies in the application.

Q4. How would you improve the API that you just used?
A4: Overall the API was easy to use, except that there was not an individual data object for images. 

    - There are multiple ways of accessing one certain image, I think there should be one way to access them as this would reduce image data by a lot.
    - I woudl convert all jpg images in this API to text/html as these are drastically smaller in size.
    - I would like to make improvements to the response time and the load time as well.

Q5. Please describe yourself using correctly formatted JSON.
A5: 
    {
        "name": "Akash Mulye",
        "age": 24,
        "personality": "outgoing",
        "favourite_colour": "blue!",
        "primary_skill": "Front end",
        "secondary_skill": "Back end",
        "tech_stack_experience" : [
            {
                "MERN": "2.5 years",
                "THREE": "4 years",
                "JAVASCRIPT: "4 years",
                "HTML/CSS/": "5 years",
                "SCSS": "2.5 years",
            }
        ],

        "strengths": [
            "strength_1": "fast learner",
            "strength_2": "motivated",
            "strength_3": "success driven",
            "strength_4": "team participation",
            "strength_5": "knwledge advocate"
        ]
    }


