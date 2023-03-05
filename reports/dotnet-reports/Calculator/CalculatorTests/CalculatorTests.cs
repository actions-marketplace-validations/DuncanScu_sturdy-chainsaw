namespace CalculatorTests;

public class CalculatorTests
{
    [Fact]
    public void Add_ShouldReturnCorrectResult()
    {
        // Arrange
        var calc = new Calculator.Calculator();

        // Act
        var result = calc.Add(5, 10);

        // Assert
        Assert.Equal(15, result);
    }

    [Fact]
    public void Subtract_ShouldReturnCorrectResult()
    {
        // Arrange
        var calc = new Calculator.Calculator();

        // Act
        var result = calc.Subtract(20, 7);

        // Assert
        Assert.Equal(13, result);
    }

    [Fact]
    public void Multiply_ShouldReturnCorrectResult()
    {
        // Arrange
        var calc = new Calculator.Calculator();

        // Act
        var result = calc.Multiply(3, 4);

        // Assert
        Assert.Equal(12, result);
    }

    [Fact]
    public void Divide_ShouldReturnCorrectResult()
    {
        // Arrange
        var calc = new Calculator.Calculator();

        // Act
        var result = calc.Divide(10, 2);

        // Assert
        Assert.Equal(5, result);
    }

    [Fact]
    public void Divide_ShouldThrowExceptionIfDivisorIsZero()
    {
        // Arrange
        var calc = new Calculator.Calculator();

        // Act & Assert
        Assert.Throws<DivideByZeroException>(() => calc.Divide(10, 0));
    }
}