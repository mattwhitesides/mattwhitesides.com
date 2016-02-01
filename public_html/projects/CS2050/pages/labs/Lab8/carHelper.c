#include "carHelper.h"

Car* insertCar(Car* head, char* name, char* model, int year) {
    Car* newCar = malloc(sizeof(Car));
    newCar->name = name;
    newCar->model = model;
    newCar->year = year;
    newCar->next = head;
    return newCar;
}

void printCars(Car* cars) {
  Car* car = cars;
  while (car != NULL) {
    printf("%s %s %d\n", car->name, car->model, car->year);
    car = car->next;
  }
}

void freeCars(Car* cars) {
  Car* temp = NULL;
  while (cars != NULL) {
    temp = cars;
    cars = cars->next;
    free(temp);
  }
}
