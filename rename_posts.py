import os
import re
from datetime import datetime

# Define the directory containing your Markdown files
posts_directory = '/Users/yy/Library/CloudStorage/OneDrive-个人/博客/个人博客/zozo-blog/content/posts'

# Function to extract date from Front Matter
def extract_date(content):
    # Regex to find the date in the Front Matter
    match = re.search(r'date:\s*"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})"', content)
    if match:
        return match.group(1)
    return None

# Function to add date to the filename
def format_filename(date_str, title):
    # Format date to YYYY-MM-DD
    date_formatted = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
    # Remove unwanted characters from title and ensure it's valid
    title_sanitized = re.sub(r'[\/:*?"<>|]', '', title)
    # Create new filename
    return f'{date_formatted}-{title_sanitized}.md'

# Process each file in the directory
for filename in os.listdir(posts_directory):
    if filename.endswith('.md'):
        filepath = os.path.join(posts_directory, filename)
        
        # Read the content of the file
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Extract the date from the content
        date_str = extract_date(content)
        if date_str:
            # Extract the title from the filename (assuming it needs to be preserved)
            # Title extraction logic, assuming the title is after the date
            title_match = re.search(r'title:\s*"([^"]+)"', content)
            title = title_match.group(1) if title_match else 'Untitled'
            
            # Create new filename
            new_filename = format_filename(date_str, title)
            new_filepath = os.path.join(posts_directory, new_filename)
            
            # Write updated content to the new file
            with open(new_filepath, 'w', encoding='utf-8') as file:
                file.write(content)
            
            # Remove old file
            os.remove(filepath)
            print(f'Renamed: {filename} -> {new_filename}')
        else:
            print(f'No date found in: {filename}')
