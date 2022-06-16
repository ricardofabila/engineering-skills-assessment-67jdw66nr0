# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

For this I would create an "Epic" (parent task) which would contain the following subtasks:
Note: time/effort estimates do NOT include review time, as that varies depending on the team's time.


1) Create new Database Table for the Agent - Facility relationship to host the new ids
    Description: 
        For Facilities to be able to assign each Agent a custom ID.
    
    Implementation details:
        We need a new table on our db called `facilities_agent_id`. this table will contain 3 columns `facility_id`, `agent_id`, and `custom_id`. All columns are of type bigInt. An unique constraint should be placed on facility_id and agent_id, so that we don't have dupes for the same agent on the same facility.

    Acceptance criteria:
        New table and constraintis created via a migration.
        New table and unique constraint is present.

    Time/effort estimates: half a day

2) Create new Enpoint for Facilities to add a custom id for Agents
    Description: 
        For Facilities to be able to assign each Agent a custom ID, create a new endpoint that receives a list of agents ids and the new custom Id they with to use.
    
    Implementation details:
        Create a new PUT endpoint that takes a json payload such as the following: 
        Array[ Object{id: <int>, customId: <int>} ]
        This endpoint would create or update the record on the `facilities_agent_id`.
        The Facility Id is specified in the endpoint URL: PUT: v1/{faliclityId}/set-custom-agent-ids


    Acceptance criteria:
        New record is created if no record for the agent id and teh facility id is found.
        Record is updated with the new custom id if it is found.
        Tests are added for the above cases.

    Time/effort estimates: a day

3) Report function uses the custom ids if they exist
    Description: 
        When Facilities generate their reports, they see the custom ids for the agents if they exist.
    
    Implementation details:
        Modify the generateReport functionality to search the `facilities_agent_id` table for the new custom ids for the agents, if they do not exist us the exisitig DB ids.

    Acceptance criteria:
        When generating a repost, the new custom ids for teh Agents are used if they exist.
        Tests for cases when the new Ids exist and when they do not.

    Time/effort estimates: half a day