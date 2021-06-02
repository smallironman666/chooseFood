import random
import time
import os
#输入食物名字 存到列表
def inputFood():
	food=[]
	while True:
		temp=input('输入想吃的东西叭（输入完一个按一下回车再输入哦~全部输入完输入一个‘q’）')
		
		if temp=='q':
			print(food)
			break
		else:
			food.append(temp)

	l=len(food)
	print('一共有%d种选项呦'%l)
	return food
def chooseFood(food):
	l=len(food)
	a=random.randint(0,l)
	print('OH MY GOD！吃它！！！',end='')
	print(food[a])


	
food=inputFood()
i=0
while i<3:
	print('请稍等'+'.'*i)
	i+=1
	time.sleep(1)
chooseFood(food)
os.system('pause')
