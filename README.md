# RoR - Randomizer of Recipes
Project for the course Program Design and Data Structures - 1DL201 
at Uppsala University

-------------------------------------------------------------------------------
RoR - Randomizer of Recipes is a one-of-a-kind program that
generates a completely random, step-by-step recipe with random ingredients
and cooking instructions which takes your dietary restrictions into account.

The program is intended to be used when you are looking for inspiration for
a new recipe or if you are tired of eating the same things over and over again.
It can be used to create a new recipe to follow, or to get some new
ideas and spice up your cooking.

-------------------------------------------------------------------------------
You can change the global constants in RoR.ts to further customize the program:
- prompt - DO NOT CHANGE. DOING SO MIGHT BREAK ALL USER PROMPTS.

- print_bold_text: Set this to false if no printed messages appear bold,
or if it is causing any other issues. Sometimes having this constant be "true"
will have other unwanted effects instead, like enclosing the printed text in
red "ESC" instead.

- portion_size: The interval in which each portion will be generated.
Making this interval too small will significantly increase run time.
