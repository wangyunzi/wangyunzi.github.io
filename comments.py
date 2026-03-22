import json
from datetime import datetime, timezone

# 读取 JSON 数据
with open('/Users/yy/Library/CloudStorage/OneDrive-个人/下载/twikoo-comment_副本.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 转换 JSON 数据
converted_data = []
for item in data:
    converted_item = {
        "id": item["_id"],
        "collectionId": "y5c4c7bmmilliez",
        "collectionName": "comments",
        "created": datetime.fromtimestamp(item["created"] / 1000, tz=timezone.utc).strftime("%Y-%m-%d %H:%M:%S.%fZ"),
        "updated": datetime.fromtimestamp(item["updated"] / 1000, tz=timezone.utc).strftime("%Y-%m-%d %H:%M:%S.%fZ"),
        "uri": item["url"],
        "author": item["nick"],
        "email": item["mail"],
        "website": item["link"],
        "content": item["comment"],
        "parent": item.get("pid", ""),  # 提供默认值为空字符串
        "is_mod": item["master"]
    }
    converted_data.append(converted_item)

# 写入转换后的 JSON 数据
with open('converted_comments.json', 'w', encoding='utf-8') as f:
    json.dump(converted_data, f, ensure_ascii=False, indent=4)
