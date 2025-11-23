
class MyName:
    total_names = 0

    def __init__(self, name=None, domain="itcollege.lviv.ua") -> None:
        if name is None:
            obj = self.anonymous_user()
            self.name = obj.name
        else:
            if not name.isalpha():
                raise ValueError("Ім'я може містити лише літери!")
            self.name = name.capitalize()

        MyName.total_names += 1
        self.my_id = self.total_names
        self.domain = domain

    @property
    def whoami(self) -> str:
        return f"My name is {self.name}"
    
    @property
    def my_email(self) -> str:
        return self.create_email()
    
    def create_email(self) -> str:
        return f"{self.name}@{self.domain}"

    @property
    def full_name(self):
        return f"User #{self.my_id}: {self.name} ({self.my_email})"

    def count_letters(self):
        return len(self.name)

    @classmethod
    def anonymous_user(cls):
        return cls("Anonymous")
    
    @staticmethod
    def say_hello(message="Hello to everyone!") -> str:
        return f"You say: {message}"

    def save_to_file(self, filename="users.txt"):
        with open(filename, "a", encoding="utf-8") as f:
            f.write(self.full_name + "\n")


print("Розпочинаємо створювати обєкти!")

names = ("Bohdan", "Marta", None, "Vasyl")
all_names = {name: MyName(name) for name in names}

for name, me in all_names.items():
    print(f"""{">*<"*20}
Object: {me} 
Attr: {me.name} / {me.my_id}
Whoami: {me.whoami} / {me.my_email}
Email: {me.create_email()}
Hello: {me.say_hello("Custom greeting!")}
Letters: {me.count_letters()}
Full: {me.full_name}
Saved to file.
Class var: {MyName.total_names} / {me.total_names}
{"<*>"*20}""")
    me.save_to_file()

print(f"Всього створено {MyName.total_names} об'єкти.")
