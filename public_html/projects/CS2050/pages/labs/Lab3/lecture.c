#include <stdio.h>
#include <stdlib.h>

//Testing & Debugging
//Code Design & Logical Thinking
//Writing Reusable code

//Struct
typedef struct account {
  char* name;
  double amt;
} Account;

Account* readFile(char* fileName, int* size);
Account* updateAccounts(Account* accounts, int size);
void printUpdatedFile(Account* accounts, int size);

int main(int argc, char* argv[]) {

  //Check command line arguments

  //Init size
  int size;
  Account* accounts;

  accounts = readFile(argv[1], &size);
  if (accounts == NULL) return -1;
  accounts = updateAccounts(accounts, size);
  printUpdatedFile(accounts, size);


  return 0;
}

//Read in the file
//  parameters: char* filename
//
Account* readFile(char* fileName, int* size) {

  //Open the file
  FILE* file = fopen(fileName, "r");

  //Check for valid file
  if (file == NULL) return NULL;

  //scanf in the size
  fscanf(file, "%d", size);

  //Define accounts
  //Malloc memory from size
  Account* accounts = malloc(sizeof(Account) * (*size));

  int i = 0;
  //loop over until size is reached
  for (i = 0; i < (*size); ++i) {
    //fscanf in the name and amt
    accounts[i].name = malloc(sizeof(char) * 30);
    fscanf(file, "%s %lf", accounts[i].name, &accounts[i].amt);
  }


  //close the file
  fclose(file);

  //return
  return accounts;
}

//Subtracts from the amt in accounts
//  parameters: Accounts, size
//  return account pointer;
Account* updateAccounts(Account* accounts, int size) {

  int i = 0;

  for (i = 0; i < size; ++i) {
    accounts[i].amt -= 1500;
  }

  return accounts;
}

//Print out the updated file
//  parameters: Accounts, size
void printUpdatedFile(Account* accounts, int size) {
  int i = 0;
  FILE* file = fopen("update.txt", "w");

  for (i = 0; i < size; ++i) {
    fprintf(file, "%s %lf\n", accounts[i].name, accounts[i].amt);
  }
}
