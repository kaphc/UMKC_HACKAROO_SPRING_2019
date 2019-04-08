import itertools
numbers = [1.0, 2.0, 3.0, 7.0, 10.0, 19.0]

print(type(numbers))
rand_1 = 0
result1=[]
for j in range(0, len(numbers)):
    result = [seq for i in range(len(numbers), 0, -1) for seq in itertools.combinations(numbers, i) if sum(seq) == numbers[j]]
    length = 0
    for item in range(0, len(result)):
        max_value = len(result[item])
        if(max_value > length):
            length = max_value
            index = item

    result1.append(result[index])
    print(result1)


leng1=0
for a in range(0, len(result1)):
    max_value1 = len(result1[a])
    if (max_value1 > leng1):
        leng1= max_value1
        index1 = a


print("*********")
print(result1[index1])
print(len(result1[index1]))

