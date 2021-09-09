# 1. 修改字符串大小写
name = 'ada lovelace'
# 首字母大写
print(name.title())

name = 'Ada Lovelace'
# 全大写
print(name.upper())
# 全小写
print(name.lower())


# 2. 在字符串中使用变量
first_name = 'ada'
last_name = 'lovelace'
full_name = f'{first_name} {last_name}'
print(full_name)
print(f'Hello, {full_name.title()}!')


# 3. 使用制表符或换行符添加空白
print('Python')
print('\tPython')

print('Languages: \nPython\nC\nJavaScript')
print('Languages: \n\tPython\n\tC\n\tJavaScript')


# 4. 删除空白
favorite_language = 'python '
print(favorite_language)
print(favorite_language.rstrip())
print(favorite_language)
# rstrip() 尾空白
# lstrip() 首空白
# strip() 首尾空白