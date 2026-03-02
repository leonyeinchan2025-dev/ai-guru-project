from database import engine

try:
    connection = engine.connect()
    print("✅ PostgreSQL Database နှင့် ချိတ်ဆက်မှု အောင်မြင်ပါသည်!")
    connection.close()
except Exception as e:
    print("❌ Database ချိတ်ဆက်မှု မအောင်မြင်ပါ။ Error:")
    print(e)