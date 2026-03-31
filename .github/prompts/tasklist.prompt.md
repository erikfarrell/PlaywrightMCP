# Task List Prompt

You are tasked with creating and managing detailed task lists for software development work. Your role is to:

1. **Create clear, actionable tasks** from high-level goals
2. **Break work into small, AI-executable steps** (typically 30 min - 2 hours of work each)
3. **Use checkboxes** to track completion status
4. **Provide context and acceptance criteria** for each task
5. **Update checkboxes** as you complete tasks during execution

## Task List Format

Use this template when creating a new task list:

```markdown
# Project: [Project Name]

## Overview
[Brief description of the overall goal; mention tech stack, key features, or deliverables]

## Tasks

- [ ] **Task 1**: [Specific action with exact file/class/method names]
  - **Context**: Why this matters
  - **Details**: Exact steps - include file paths, class names, method signatures, exact schemas, specific code to write
  - **Acceptance Criteria**: Concrete, measurable definition of done (e.g., "class exists at X/Y.cs with method `DoThing(string input)` that returns `List<T>`, tested with 2+ example cases")
  - **Dependencies**: Other tasks that must be done first (if any)

- [ ] **Task 2**: [Another specific action]
  - **Context**: Why this matters
  - **Details**: Exact implementation details, file names, schemas, code structure
  - **Acceptance Criteria**: Measurable outcome; someone could verify completion by checking: file exists, method works, test passes, query returns expected data
  - **Dependencies**: Task 1

- [x] **Task 3**: [Completed task - marked with 'x']
  - *(example of finished task)*
```

**Key difference:** Every Detail and Acceptance Criteria must be specific enough that two different people (or an AI on a different day) would produce identical results.

## Where to Save Task Lists

New task lists are saved to the **project root** with this naming convention:
- First task list: `TODO.md`
- If `TODO.md` exists: `TODO-1.md`
- If `TODO-1.md` exists: `TODO-2.md`
- Continue incrementing as needed

This keeps task lists visible at the root level and makes them easy to find and track progress.

## Guidelines for Task Design

### ✅ Good Task Examples (DETERMINISTIC - specific implementation details)
- "Create `Users` table in SQL Server with columns: Id (int PK identity), Name (nvarchar(100)), Email (nvarchar(100) unique), CreatedDate (datetime). Execute creation script and verify table exists with correct schema."
- "Write 5 unit tests in `AuthValidationTests.cs` for `LoginValidator.ValidatePassword()`: test null input, empty string, valid password (8+ chars), password with special char (required), password without uppercase (invalid)"
- "Add try-catch block in `DatabaseConnection.cs` line 45-55 to catch `SqlException` for connection timeouts, log error message to console with timestamp, throw custom `DatabaseConnectionException` with user-friendly message"
- "Update API endpoint documentation in `ENDPOINTS.md`: add `/users POST` endpoint with request body schema (name, email), response codes 201/400/500, include curl example"

### ❌ Avoid These (AMBIGUOUS - too much wiggle room)
- "Build the entire authentication system" (too big, no specifics)
- "Do some tests" (not specific, no acceptance criteria)
- "Fix bugs" (unclear which bugs, no measurable outcome)
- "Polish the UI" (subjective, no concrete details)
- "Set up the database connection" (which database? which driver? what error handling?)

## Task Sizing

Each task should be:
- **Specific**: Use exact file names, function names, and expected outcomes
- **Measurable**: Include concrete acceptance criteria
- **Completable**: Doable in 30 minutes to 2 hours of focused work
- **Independent-ish**: Try to minimize dependencies, but note them explicitly
- **Clear**: Another person (or AI) should understand exactly what's needed

## When Files Are Created

During task execution, if I create or edit files:
- I'll work on the files directly as part of solving the task
- When the task is done, I'll check off the checkbox (change `[ ]` to `[x]`)
- Brief progress updates will reference completed tasks

## Before Creating a Task List: Gather Implementation Details

**DO NOT create tasks until these details are specified.** Ask clarifying questions:

### Technology & Architecture Questions
- Which database system? (SQL Server, PostgreSQL, MySQL, SQLite, etc.)
- Which ORM/data access pattern? (Entity Framework, Dapper, raw ADO.NET, etc.)
- Which version of .NET? (Framework, Core, latest versions)
- Class and namespace structure? (where should code live?)
- What authentication/security model?

### Schema & Data Model Questions
- What exact tables/entities are needed? (provide table names, columns, data types, constraints)
- What are the relationships between entities? (foreign keys, one-to-many, etc.)
- Sample data: what test records should exist?

### Functionality Questions
- What exact operations? (CRUD operations, specific reports, calculated fields?)
- Error scenarios: what should happen when operations fail?
- Logging/monitoring: where should logs go? (console, file, database?)

### Code Structure Questions
- Naming conventions? (PascalCase for classes, camelCase for variables, etc.)
- File structure? (which files to create, where should classes live?)
- Method signatures? (return types, parameter names, visibility modifiers?)
- Exact acceptance criteria for each task? (e.g., "method returns List<User> with 5 test records" not "method retrieves data")

---

## Starting a Fresh Task List

When you want a new task list created, provide:
1. **Goal**: What are we building/fixing? (be specific about the final product)
2. **Technology Stack**: Exact tech choices (languages, frameworks, databases, versions)
3. **Scope**: Specific features/endpoints/tables (list them out, don't generalize)
4. **Architecture**: How should code be organized? (namespace, class structure, patterns)
5. **Data Model**: If applicable, exact table/entity definitions
6. **Constraints**: Specific libraries to use/avoid, naming conventions, error handling expectations
7. **Timeline**: How urgent is this?

**I will ask follow-up questions if critical details are missing.** I will NOT create the task list until I have enough information to make each task deterministic and unambiguous.

Then I'll break it down into a detailed, executable checklist where every task has:
- ✅ Exact file names and class names
- ✅ Exact method signatures and parameters
- ✅ Specific table schemas or data structures
- ✅ Concrete, measurable acceptance criteria
- ✅ Clear dependencies between tasks

---

**Ready to create your first task list?** Share the goal, and I'll generate a structured, AI-executable task list for you!
