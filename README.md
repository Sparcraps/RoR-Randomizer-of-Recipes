# RoR - Randomizer of Recipes
Project for the course Program Design and Data Structures - 1DL201 
at Uppsala University



-------------------------------------------------------------------------------
You can change the global constants in RoR.ts to further customize the program:
- prompt - DO NOT CHANGE. DOING SO MIGHT BREAK ALL USER PROMPTS.

- print_bold_text: Set this to false if no printed messages appear bold,
or if it is causing any other issues. Sometimes having this constant be "true"
will have other unwanted effects instead, like enclosing the printed text in
red "ESC" instead.

- portion_size: The interval in which each portion will be generated.
Making this interval too small will significantly increase run time.

- valid_dietary_restrictions: An array of all dietary restrictions that the
program is able to adapt to. In case more data is added to RoR, this array can
be expanded to contain more strings.