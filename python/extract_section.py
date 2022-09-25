def extract_section(filename, section):
    with open(filename, 'r') as file:
        lines = file.readlines()
        start = 0
        for i, line in enumerate(lines):
            if line.strip() == section:
                start = i + 1
                break
        for i, line in enumerate(lines[start:]):
            if line.strip() == "":
                end = start + i
                break
        else:
            end = len(lines)
        output_file = f"{filename}.{section}"
        with open(output_file, "w") as f:
            f.writelines(lines[start:end])
        return  output_file
