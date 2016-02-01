#include <stdio.h>
#include <stdlib.h>

typedef struct account {
  char* name;
  float salary;
} Account;

Account* readFile(char*,int*);
void printFile(Account*, int);
void freeAccounts(Account*, int);

int main(int argc, char* argv[]) {

  int size = 0;

  Account* accounts = readFile(argv[1], &size);

  if (accounts != NULL) printFile(accounts, size);
  else return -1;

  freeAccounts(accounts, size);
  return 0;
}

Account* readFile(char* fileName, int* size) {

  FILE* file = fopen(fileName, "r");

  if (file == NULL) return NULL;

  fscanf(file, "%d", size);

  Account* accounts = malloc(sizeof(Account) * (*size));

  int i = 0;

  for (i = 0; i < *size; ++i) {
    accounts[i].name = malloc(sizeof(char) * 30);
    fscanf(file, "%s %f", accounts[i].name, &accounts[i].salary);
  }

  return accounts;
}

void printFile(Account* accounts, int size) {
  FILE* file = fopen("output.txt", "w");
  int i = 0;

  for (i = 0; i < size; ++i)
    fprintf(file, "%s %.2f\n", accounts[i].name, (accounts[i].salary - 100));
}

void freeAccounts(Account* accounts, int size) {
    int i = 0;
    for (i = 0; i < size; ++i) {
      free(accounts[i].name);
    }
    free(accounts);
}
